"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Globe, Bell, Smartphone, Mail, Save } from "lucide-react"
import { useLanguage } from "./language-provider"

export function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const [notifications, setNotifications] = useState({
    push: true,
    sms: false,
    email: true,
    critical: true,
    warning: true,
    info: false,
  })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", { language, notifications, phoneNumber, email })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {language === "ar" ? "إعدادات اللغة" : "Paramètres de Langue"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{language === "ar" ? "اختر اللغة" : "Choisir la langue"}</Label>
            <Select value={language} onValueChange={(value: "fr" | "ar") => setLanguage(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="ar">🇩🇿 العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {language === "ar" ? "إعدادات الإشعارات" : "Paramètres de Notification"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Methods */}
          <div className="space-y-4">
            <h4 className="font-medium">{language === "ar" ? "طرق الإشعار" : "Méthodes de Notification"}</h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <Label>{language === "ar" ? "إشعارات الهاتف" : "Notifications Push"}</Label>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <Label>SMS</Label>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <Label>{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
              />
            </div>
          </div>

          <Separator />

          {/* Alert Types */}
          <div className="space-y-4">
            <h4 className="font-medium">{language === "ar" ? "أنواع التنبيهات" : "Types d'Alertes"}</h4>

            <div className="flex items-center justify-between">
              <Label className="text-red-600">{language === "ar" ? "تنبيهات حرجة" : "Alertes Critiques"}</Label>
              <Switch
                checked={notifications.critical}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, critical: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-yellow-600">{language === "ar" ? "تحذيرات" : "Avertissements"}</Label>
              <Switch
                checked={notifications.warning}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, warning: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-blue-600">{language === "ar" ? "معلومات" : "Informations"}</Label>
              <Switch
                checked={notifications.info}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, info: checked }))}
              />
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium">{language === "ar" ? "معلومات الاتصال" : "Informations de Contact"}</h4>

            <div className="space-y-2">
              <Label>{language === "ar" ? "رقم الهاتف" : "Numéro de téléphone"}</Label>
              <Input
                type="tel"
                placeholder={language === "ar" ? "+213 XX XX XX XX XX" : "+213 XX XX XX XX XX"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!notifications.sms}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === "ar" ? "البريد الإلكتروني" : "Adresse email"}</Label>
              <Input
                type="email"
                placeholder={language === "ar" ? "your@email.com" : "votre@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!notifications.email}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "إعدادات النظام" : "Paramètres Système"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>{language === "ar" ? "الوضع المظلم" : "Mode Sombre"}</Label>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <Label>{language === "ar" ? "التحديث التلقائي" : "Mise à jour automatique"}</Label>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <Label>{language === "ar" ? "حفظ البيانات" : "Économie de données"}</Label>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          {language === "ar" ? "حفظ الإعدادات" : "Sauvegarder"}
        </Button>
      </div>
    </div>
  )
}
