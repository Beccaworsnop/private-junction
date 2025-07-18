import { PondDetail } from "@/components/pond-detail"
import { PageHeader } from "@/components/page-header"

export default function PondDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Détails du Bassin"
        titleAr="تفاصيل الحوض"
        subtitle="Surveillance détaillée et historique"
        subtitleAr="مراقبة مفصلة وسجل تاريخي"
      />
      <div className="p-6">
        <PondDetail pondId={params.id} />
      </div>
    </div>
  )
}
