"use client"

import { WritableAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { ReactNode } from "react"

export default function AtomsHydrator({
  atomValues,
  children,
}: {
  atomValues: [WritableAtom<unknown, [any], unknown>, unknown][]
  children: ReactNode
}) {
  useHydrateAtoms(new Map(atomValues))
  return children
}