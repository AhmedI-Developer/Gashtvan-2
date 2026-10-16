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
  ArrowRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation()
  const Icon = icons[item.icon] || Newspaper

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] text-start shadow-[var(--shadow)] transition duration-300',
        'hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_36px_rgba(160,194,58,0.16)]',
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
        <img
          src={item.coverImage}
          alt=""
          loading="lazy"
          width={480}
          height={360}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(4,32,58,0.78)] via-[rgba(4,32,58,0.2)] to-transparent"
          aria-hidden="true"
        />
        <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[0.7rem] font-bold text-[var(--navy)] shadow-sm">
          <Icon size={12} strokeWidth={2.25} />
          {item.tag}
        </span>
        <p className="absolute inset-x-3 bottom-3 text-[0.65rem] font-semibold uppercase tracking-wider text-white/85">
          {formatNewsDate(item.date, i18n.language)}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3.5 py-3.5 sm:px-4 sm:py-4">
        <h3 className="line-clamp-2 min-h-[2.6em] font-display text-[0.95rem] font-bold leading-snug text-[var(--text)] sm:text-base">
          {item.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)] transition group-hover:gap-2.5">
          {t('news.readMore')}
          <ArrowRight
            size={14}
            strokeWidth={2.25}
            className="rtl:rotate-180"
            aria-hidden="true"
          />
        </span>
      </div>
    </button>
  )
}
