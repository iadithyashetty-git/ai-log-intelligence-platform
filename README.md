# AI Log Intelligence Platform

## Problem

Engineering teams often spend a lot of time manually checking logs, transaction IDs, service calls, and error stages to understand why a transaction failed or became slow.

## Solution

This project is a free/local AI-powered log intelligence platform that helps developers analyze logs, summarize transaction flows, detect failures, identify performance issues, and generate evidence-based incident reports.

## Target User

- Frontend engineers
- Backend engineers
- Support engineers
- SRE/DevOps teams
- Integration teams

## Planned Features

- Upload log files
- Filter logs by application code, interface code, transaction ID, date range
- View transaction timeline
- Summarize failed transactions
- Explain possible root causes
- Detect slow interfaces
- Chat with logs using local RAG
- Train basic ML models for failure prediction
- Generate incident reports

## Tech Stack

- Next.js
- React
- TypeScript
- Python
- pandas
- scikit-learn
- PyTorch
- Ollama
- Chroma or FAISS
- Local embeddings using sentence-transformers

## Learning Goal

The goal of this project is to transition from frontend engineering into AI/ML-powered application development.

## Purpose

apps/web      -> Next.js frontend
apps/api      -> optional Python/FastAPI backend later
notebooks     -> Python/ML learning notebooks
datasets      -> sample logs
docs          -> notes, architecture, learning journal
evals         -> AI/RAG evaluation files later
scripts       -> utility scripts