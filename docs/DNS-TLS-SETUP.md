# DNS & TLS Setup - superq.ph

Reference for the domain configuration behind the site, and the runbook for the
apex-domain certificate problem found on 2026-08-16.

---

## Current state

Nameservers are `dns1.domains.ph` / `dns2.domains.ph`, so **all DNS changes are
made at the domains.ph control panel**, not in Vercel.

| Name            | Type  | Value                                | TTL   | Host    |
| --------------- | ----- | ------------------------------------ | ----- | ------- |
| `superq.ph`     | A     | `75.2.60.5`                          | 14400 | Netlify |
| `superq.ph`     | A     | `216.198.79.1`                       | 14400 | Vercel  |
| `www.superq.ph` | CNAME | `e7b163ee797c192a.vercel-dns-017.com` | 14400 | Vercel  |

The site is deployed on Vercel (see `vercel.json`). The canonical URL used
throughout the codebase is `https://www.superq.ph` (`src/utils/constants.js`,
`public/sitemap.xml`, `public/robots.txt`).

`www.superq.ph` is configured correctly and serves a valid certificate.

---

## The problem: apex domain shows "Not secure"

The apex `superq.ph` has **two A records pointing at two different hosting
providers**:

- `75.2.60.5` — Netlify's shared apex load balancer (confirmed by reverse DNS:
  `acd89244c803f7181.awsglobalaccelerator.com`). This is a leftover from a
  previous host.
- `216.198.79.1` — Vercel's anycast pool, the intended target.

Both values are returned in a single authoritative record set by `dns1` and
`dns2.domains.ph`, so this is not a stale cache.

### Why this breaks TLS

Clients pick one of the two addresses per connection. Roughly half of all
requests to `https://superq.ph` land on Netlify, which has no site claiming
`superq.ph` and therefore cannot present a certificate for it. The browser
shows `ERR_CERT_COMMON_NAME_INVALID` / "Your connection is not private".

Two properties make this confusing to diagnose:

- **It is intermittent.** Reloading may hit the Vercel address and succeed, so
  the site looks fine some of the time.
- **It can also block renewal.** Let's Encrypt HTTP-01 validation is answered by
  whichever address it happens to reach. When it reaches Netlify the challenge
  fails, so the apex certificate can fail to issue or renew entirely rather than
  just being served inconsistently.

There is no CAA record on the apex, so certificate issuance is not being blocked
by CAA policy.

---

## Fix

1. In the **domains.ph** DNS panel, delete the apex `A` record `75.2.60.5`.
2. Keep a single apex `A` record with the value shown on the project's domain
   card in Vercel (currently `216.198.79.1`). Vercel's domain card is the source
   of truth — do not hardcode an IP from documentation.
3. Wait for propagation. The existing TTL is 14400s (4 hours), so allow up to
   4 hours. Lowering the TTL before the change shortens this window.
4. In Vercel, re-verify the apex domain and confirm the certificate is issued.

Verify from a machine with outbound access:

```sh
# should return exactly one address, the Vercel one
dig +short superq.ph A

# should complete with no verification errors and CN/SAN covering superq.ph
echo | openssl s_client -connect superq.ph:443 -servername superq.ph 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```

Once the apex resolves to Vercel only, set the apex to redirect to
`https://www.superq.ph` in the Vercel project's domain settings, so the
canonical host in the codebase matches what visitors land on.

---

## Unrelated cleanup

The apex has two `google-site-verification` TXT records, one of which is
truncated and non-functional:

- `google-site-verification=OMxUamKGhMNMxsZ3b28Rk7L4Kq5jgRP15J` (truncated)
- `google-site-verification=OMxUamKGhMNMxsZ3b28Rk7L4Kq5jgRP15JNy8FQTVMQ` (full)

The truncated one can be removed. It does not affect TLS.
