import React from 'react';
import { Database, ShieldCheck, CheckCircle2, X, Terminal, FileCode } from 'lucide-react';

interface SqlSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SqlSchemaModal: React.FC<SqlSchemaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sqlSchema = `-- CleverDish V2 Persistent Infrastructure: Community Price Ledger Migration
-- File: db/schema.sql

CREATE TABLE IF NOT EXISTS price_submission (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) NOT NULL,
    staple_id VARCHAR(64) NOT NULL,
    staple_name VARCHAR(128) NOT NULL,
    market_name VARCHAR(128) NOT NULL,
    country_code CHAR(2) NOT NULL DEFAULT 'NG',
    currency CHAR(3) NOT NULL DEFAULT 'NGN',
    reported_price NUMERIC(12, 2) NOT NULL CHECK (reported_price > 0),
    receipt_image_hash VARCHAR(64) UNIQUE,
    receipt_magic_byte VARCHAR(16) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    outlier_score NUMERIC(5, 4) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS price_accepted (
    staple_id VARCHAR(64) NOT NULL,
    market_name VARCHAR(128) NOT NULL,
    country_code CHAR(2) NOT NULL,
    median_price NUMERIC(12, 2) NOT NULL,
    sample_size INTEGER NOT NULL,
    interquartile_low NUMERIC(12, 2),
    interquartile_high NUMERIC(12, 2),
    last_moderated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (staple_id, market_name, country_code)
);

-- Automated Trigger to recalculate median upon verified submission
CREATE INDEX IF NOT EXISTS idx_submission_staple_market 
ON price_submission (staple_id, market_name, created_at DESC);
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Banner */}
        <div className="bg-[#7A1C2C] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">V2 SQL Ledger Migration (db/schema.sql)</h3>
              <p className="text-xs text-white/80">Persistent infrastructure & receipt audit tables</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-white/80 hover:text-white flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2ECC71] shrink-0 mt-0.5" />
            <span>
              Transitioning from local JSON ledgers (`data/price-samples.json`) to robust relational SQL persistence with `price_submission` and `price_accepted` tables for statistical outlier trimming and tamper-proof moderation.
            </span>
          </div>

          <div className="rounded-2xl bg-stone-900 text-stone-100 p-4 font-mono text-xs overflow-x-auto shadow-inner border border-stone-800">
            <div className="flex items-center justify-between text-stone-400 pb-2 mb-2 border-b border-stone-800 text-[11px]">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-[#2ECC71]" />
                db/schema.sql
              </span>
              <span>PostgreSQL DDL</span>
            </div>
            <pre className="text-[11px] leading-relaxed text-emerald-400">{sqlSchema}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
