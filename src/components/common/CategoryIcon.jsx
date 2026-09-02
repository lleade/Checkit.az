function CategoryIcon({ type, label = '' }) {
  const icons = {
    laptop: '/noutbuk.svg',
    desktop: '/masaustu-pc.svg',
    cpu: '/komputer-hisseleri.svg',
    keyboard: '/komp-aksesuarlari.svg',
    monitor: '/monitor-aksesuarlar.svg',
    printer: '/ofis-avadanligi.svg',
    network: '/sebeke-avadanliqlari.svg',
    camera: '/video-musahide.svg',
    phone: '/telefon-aksesuarlari.svg',
  }

  return (
    <img
      src={icons[type] || icons.laptop}
      alt={label}
      aria-hidden={label ? undefined : 'true'}
      className="h-5 w-5 shrink-0"
      loading="lazy"
    />
  )
}

export default function CategoryIconWrapper({ type, label }) {
  return <CategoryIcon type={type} label={label} />
}

export { CategoryIcon }
