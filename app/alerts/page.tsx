import { AlertsPage } from "@/components/alerts-page"
import { PageHeader } from "@/components/page-header"

export default function Alerts() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Alertes"
        titleAr="التنبيهات"
        subtitle="Historique des alertes et notifications"
        subtitleAr="سجل التنبيهات والإشعارات"
      />
      <div className="p-6">
        <AlertsPage />
      </div>
    </div>
  )
}
