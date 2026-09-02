import Container from '../container/Container'; 
export default function AboutSection() {
  return (
    <section className="bg-white py-12">
      <Container className="flex min-w-0 flex-col gap-4 py-3 md:gap-6">
        <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
          Check it – Noutbuk, Kompüter Hissələri və Elektronika Aksesuarlarının Onlayn Mağazası
        </h2>
        <p className="leading-relaxed text-gray-600">
          Check it – gündəlik istifadə və peşəkar ehtiyaclar üçün noutbuk, masaüstü kompüter,
          kompüter hissələri, printer və elektronika aksesuarlarının etibarlı onlayn mağazasıdır.
          Geniş məhsul çeşidimizlə sizə ən yaxşı texnologiya həllərini təqdim edirik.
        </p>
        <p className="leading-relaxed text-gray-600">
          Yaddaş cihazları, klaviatura və siçan dəstləri, şəbəkə avadanlıqları, adapterlər və
          kabellər daxil olmaqla geniş kataloqumuz mövcuddur. Sürətli çatdırılma və keyfiyyətli
          müştəri xidməti ilə Check it.az-da alış-veriş edin.
        </p>
      </Container>
    </section>
  )
}
