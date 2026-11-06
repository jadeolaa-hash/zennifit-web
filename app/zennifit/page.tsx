import type { Metadata } from "next"
import ZenniFitLanding from "@/components/landing/zennifit-landing"

export const metadata: Metadata = {
  title: "ZenniFit — Recovery, training and an AI Coach in one app",
  description: "Readiness, training plans, health trends, an AI Coach and your crew, in one app. Join the early-access list.",
}

export default function ZenniFitPage() {
  return <ZenniFitLanding />
}
