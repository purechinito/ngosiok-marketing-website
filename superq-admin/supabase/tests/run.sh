#!/usr/bin/env bash
# Run the rules test against a throwaway Postgres.
#
# These assertions ARE the business requirements. If one fails, a promise in
# the README is no longer true — so run this after touching schema.sql.
#
#   PGHOST=127.0.0.1 PGPORT=5432 PGUSER=postgres ./supabase/tests/run.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SUPA="$(dirname "$HERE")"
DB="${TEST_DB:-superq_test}"
PSQL="psql -h ${PGHOST:-127.0.0.1} -p ${PGPORT:-5432} -U ${PGUSER:-postgres} -v ON_ERROR_STOP=1 -q"

$PSQL -d postgres -c "drop database if exists $DB"
$PSQL -d postgres -c "create database $DB"

$PSQL -d "$DB" -f "$HERE/00_harness_pre.sql"   # stand-ins for Supabase's auth/storage
$PSQL -d "$DB" -f "$SUPA/schema.sql"
$PSQL -d "$DB" -f "$HERE/02_harness_post.sql"  # the grants Supabase makes by default
$PSQL -d "$DB" -f "$SUPA/seed.sql"

psql -h "${PGHOST:-127.0.0.1}" -p "${PGPORT:-5432}" -U "${PGUSER:-postgres}" \
     -d "$DB" -q -f "$HERE/03_rules_test.sql"
