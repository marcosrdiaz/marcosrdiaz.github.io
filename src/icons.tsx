import {
  Award, BookOpen, Briefcase, Cpu, Dumbbell, Gamepad2, GraduationCap, Globe, Handshake,
  Lightbulb, Lock, MessageCircle, Puzzle, RefreshCw, Rocket, ShoppingBag, Smartphone,
  Snowflake, Swords, Terminal, Timer, Trophy, Zap, type LucideIcon,
} from 'lucide-react'

/** Icon keys used in data.ts, mapped to lucide components (single icon set for the UI). */
export const iconMap = {
  dumbbell: Dumbbell,
  book: BookOpen,
  lock: Lock,
  shopping: ShoppingBag,
  snowflake: Snowflake,
  code: Terminal,
  gamepad: Gamepad2,
  engine: Timer,
  handshake: Handshake,
  message: MessageCircle,
  puzzle: Puzzle,
  swords: Swords,
  rocket: Rocket,
  refresh: RefreshCw,
  lightbulb: Lightbulb,
  globe: Globe,
  smartphone: Smartphone,
  cpu: Cpu,
  zap: Zap,
  trophy: Trophy,
  briefcase: Briefcase,
  education: GraduationCap,
  award: Award,
} satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof iconMap

export function Icon({ name, ...props }: { name: IconKey } & React.ComponentProps<LucideIcon>) {
  const C = iconMap[name]
  return <C strokeWidth={1.6} aria-hidden {...props} />
}
