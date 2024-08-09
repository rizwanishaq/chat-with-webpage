import {NextResponse } from "next/server"

export function middleware(req) {
  const res = NextResponse.next()

  const cookie = req.cookies.get("sessionId")

  if (!cookie) {
    res.cookies.set("sessionId", crypto.randomUUID())
  }

  return res
}