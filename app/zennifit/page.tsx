import type { Metadata } from "next"
import ZenniFitLanding from "@/components/landing/zennifit-landing"

export const metadata: Metadata = {
  title: "ZenniFit — Training To Match Your Every Movement",
  description: "Readiness, training plans, health trends, Zenni AI and your crew, in one app. Join the early-access list.",
}

export default function ZenniFitPage() {
  return <ZenniFitLanding />
}
