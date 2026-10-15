import {
  Plane,
  Mountain,
  Users,
  FileCheck,
  Globe2,
  GraduationCap,
  Building2,
  Landmark,
  Hotel,
  MapPin,
  HeartHandshake,
  Camera,
  FerrisWheel,
  TrainFront,
  Snowflake,
  Palmtree,
  BookOpen,
  Briefcase,
  Newspaper,
} from 'lucide-react'
import { formatNewsDate } from '@/lib/news'
import { cn } from '@/lib/cn'

const icons = {
  Plane,
  Mountain,
  Users,
  FileCheck,
  Globe2,
  GraduationCap,
  Building2,
  Landmark,
  Hotel,
  MapPin,
  HeartHandshake,
  Camera,
  FerrisWheel,
  TrainFront,
  Snowflake,
  Palmtree,
  BookOpen,
  Briefcase,
  Newspaper,
}

export default function NewsCard({ item, onOpen }) {
  const Icon = icons[item.icon] || Newspaper

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] text-start shadow-[var(--shadow)] transition duration-300 sm:rounded-[20px]',
        'hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_12px_28px_rgba(160,194,58,0.14)]',
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.coverImage}
          alt=""
          loading="lazy"
          width={480}
          height={300}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--navy)]">
          <Icon size={11} strokeWidth={2.25} />
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
          {formatNewsDate(item.date)}
        </p>
        <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug text-[var(--text)] sm:text-[0.95rem]">
          {item.title}
        </h3>
        <span className="mt-auto inline-flex pt-2.5 text-xs font-semibold text-[var(--accent-text)]">
          Read more →
        </span>
      </div>
    </button>
  )
}
