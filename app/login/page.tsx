"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()
  const { t, dir } = useLanguage()
  const searchParams = useSearchParams()
  const role = searchParams.get("role")

  // Set default email based on role
  useEffect(() => {
    if (role === "admin") {
      setEmail("admin@university.edu")
    } else if (role === "teacher") {
      setEmail("teacher@university.edu")
    } else if (role === "student") {
      setEmail("student@university.edu")
    }
  }, [role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  const getRoleTitle = () => {
    if (role === "admin") {
      return t("roles.admin")
    } else if (role === "teacher") {
      return t("roles.teacher")
    } else if (role === "student") {
      return t("roles.student")
    }
    return ""
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4"
      dir={dir}
    >
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_universite-rBCWJvlJdIulKoDqALIzWAGKTycOkW.png"
            alt={t("common.university")}
            width={180}
            height={60}
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-slate-800">{t("common.welcome")}</h1>
          {role && <p className="text-slate-600 mt-2">{getRoleTitle()} Login</p>}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("auth.loginTitle")}</CardTitle>
            <CardDescription>{t("auth.loginSubtitle")}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    {t("auth.forgotPassword")}
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  {t("auth.rememberMe")}
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("common.loading") : t("auth.loginButton")}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Demo Accounts:</p>
          <p className="mt-1">
            Admin: admin@university.edu
            <br />
            Teacher: teacher@university.edu
            <br />
            Student: student@university.edu
          </p>
          <p className="mt-1">Password: password</p>
        </div>
      </div>
    </div>
  )
}
