/**
 * Domain types for the portfolio content.
 * All user-facing strings are localized via the `LocalizedText` shape so the
 * same data array can feed both the FR and EN renders.
 */

export type LocalizedText = {
  fr: string;
  en: string;
};

export interface Project {
  /** Stable identifier, used for anchors and React keys. */
  id: string;
  title: LocalizedText;
  /** Short tagline shown on the case card. */
  tagline: LocalizedText;
  description: LocalizedText;
  /** Tech / domain tags displayed as chips. */
  tags: string[];
  /** External link for the "Inspect case" action. Optional while placeholder. */
  url?: string;
  /** Accent color (hex) used by the case's 3D visual. */
  accent: string;
}
