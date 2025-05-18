"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Camera, CheckCircle2, AlertCircle } from "lucide-react"
import { StudentSidebar } from "../sidebar"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/toast"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import dynamic from "next/dynamic"

const QrScanner = dynamic(() => import("react-qr-reader"), {
  ssr: false,
})

export default function ScanQRPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { toast } = useToast()
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const qrRef = useRef<any>(null)

  useEffect(() => {
    // Check for camera permission on mount
    ;(async () => {
      const status = await navigator.permissions.query({ name: "camera" })
      setHasPermission(status.state === "granted")
    })()
  }, [])

  const handleStartScan = () => {
    if (hasPermission === false) {
      toast({
        title: t("scanQrPage.cameraPermissionDenied"),
        description: t("scanQrPage.pleaseGrantCameraPermission"),
        variant: "destructive",
      })
      return
    }
    setScanStatus("scanning")
  }

  const handleScan = (result: any) => {
    if (result) {
      setScanResult(result?.text)
      setScanStatus("success")
      toast({
        title: t("scanQrPage.attendanceRegistered"),
        description: t("scanQrPage.attendanceRegisteredSuccessfully"),
      })
    }
  }

  const handleError = (error: any) => {
    console.error(error)
    setScanStatus("error")
    toast({
      title: t("scanQrPage.scanningFailed"),
      description: t("scanQrPage.unableToRecognizeQrCode"),
      variant: "destructive",
    })
  }

  const handleReset = () => {
    setScanStatus("idle")
    setScanResult(null)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_universite-rBCWJvlJdIulKoDqALIzWAGKTycOkW.png"
                alt="Abbas Laghrour University Khenchela Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <h1 className="text-xl font-bold text-slate-800">{t("scanQrPage.scanQrCode")}</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  {t("scanQrPage.scanAttendanceQrCode")}
                </CardTitle>
                <CardDescription>{t("scanQrPage.scanQrCodeDisplayedByProfessor")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md aspect-square bg-slate-100 rounded-lg mb-6 relative overflow-hidden">
                    {scanStatus === "idle" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <QrCode className="w-24 h-24 text-slate-300 mb-4" />
                        <p className="text-slate-500">{t("scanQrPage.clickStartScanningButton")}</p>
                      </div>
                    )}

                    {scanStatus === "scanning" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                        <div className="relative w-full h-full">
                          <QrScanner
                            ref={qrRef}
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: "100%", height: "100%" }}
                          />
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-white/50 rounded-lg">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500 rounded-tl"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500 rounded-tr"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500 rounded-bl"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                          </div>
                        </div>
                        <p className="text-white text-sm mt-4 absolute bottom-6">{t("scanQrPage.scanning")}</p>
                      </div>
                    )}

                    {scanStatus === "success" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50 p-6 text-center">
                        <CheckCircle2 className="w-24 h-24 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold text-green-700 mb-2">
                          {t("scanQrPage.attendanceRegistered")}!
                        </h3>
                        <p className="text-green-600 mb-4">{t("scanQrPage.attendanceSuccessfullyRecorded")}</p>
                        <div className="bg-white rounded-lg p-4 w-full">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-500">{t("scanQrPage.course")}:</span>
                            <span className="font-medium">CS301: Advanced Algorithms</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-500">{t("scanQrPage.date")}:</span>
                            <span className="font-medium">May 9, 2023</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-500">{t("scanQrPage.time")}:</span>
                            <span className="font-medium">10:15 AM</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">{t("scanQrPage.professor")}:</span>
                            <span className="font-medium">Dr. Ahmed</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {scanStatus === "error" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 p-6 text-center">
                        <AlertCircle className="w-24 h-24 text-red-500 mb-4" />
                        <h3 className="text-xl font-bold text-red-700 mb-2">{t("scanQrPage.scanningFailed")}</h3>
                        <p className="text-red-600 mb-4">{t("scanQrPage.unableToRecognizeQrCode")}</p>
                        <Alert variant="destructive" className="text-left">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{t("scanQrPage.error")}</AlertTitle>
                          <AlertDescription>{t("scanQrPage.qrCodeInvalidOrExpired")}</AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </div>

                  {scanStatus === "idle" && (
                    <Button onClick={handleStartScan} className="gap-2" disabled={hasPermission === false}>
                      <Camera className="h-4 w-4" />
                      {t("scanQrPage.startScanning")}
                    </Button>
                  )}

                  {scanStatus === "scanning" && (
                    <Button variant="outline" onClick={handleReset} className="gap-2">
                      {t("scanQrPage.cancel")}
                    </Button>
                  )}

                  {(scanStatus === "success" || scanStatus === "error") && (
                    <Button onClick={handleReset} className="gap-2">
                      {t("scanQrPage.scanAnotherQrCode")}
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t px-6 py-4">
                <div className="text-sm text-slate-500">
                  <p className="font-medium mb-1">{t("scanQrPage.instructions")}:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>{t("scanQrPage.clickStartScanning")}</li>
                    <li>{t("scanQrPage.pointCameraAtQrCode")}</li>
                    <li>{t("scanQrPage.holdDeviceSteady")}</li>
                    <li>{t("scanQrPage.onceScannedAttendanceRecorded")}</li>
                    <li>{t("scanQrPage.receiveConfirmationMessage")}</li>
                  </ol>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
