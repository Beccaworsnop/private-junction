import { SettingsPage } from "@/components/settings-page"
import { PageHeader } from "@/components/page-header"

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title="Paramètres"
        titleAr="الإعدادات"
        subtitle="Configuration et préférences"
        subtitleAr="التكوين والتفضيلات"
      />
      <div className="p-6">
        <SettingsPage />
      </div>
    </div>
  )
}
