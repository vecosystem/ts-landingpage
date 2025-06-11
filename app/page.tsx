"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Search, BookOpen, Target, Instagram } from "lucide-react"
import Image from "next/image"
import { submitToNotion } from './actions'

export default function VecoLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      
      const result = await submitToNotion(formDataObj)
      
      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsModalOpen(false)
          setIsSubmitted(false)
          setFormData({ name: "", email: "" })
        }, 2000)
      } else {
        setError('제출 중 오류가 발생했습니다.')
      }
    } catch (err) {
      setError('제출 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <Image src="/veco-logo.png" alt="VECO Logo" width={200} height={200} className="mx-auto" />
            <h1 className="text-5xl md:text-7xl font-bold text-[#132650] leading-tight">
              정보는 모으고,
              <br />
              목표는 사냥한다
            </h1>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#132650] hover:bg-[#2E4475] text-white px-8 py-4 text-lg rounded-lg font-semibold"
          >
            사전 등록하고 가장 먼저 만나보기
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="min-h-screen flex items-center px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#132650] leading-tight">
              프로젝트 문서가
              <br />
              여기저기 흩어져
              <br />
              있진 않나요?
            </h2>
            <div className="space-y-6 text-xl text-gray-600">
              <p>"회의록은 Notion, 이슈는 Slack, 변경사항은 GitHub..."</p>
              <p>"기획이 자주 바뀌는데, 전달은 언제나 늦게 되죠."</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                <p className="font-semibold">Notion</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2"></div>
                <p className="font-semibold">Slack</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-2"></div>
                <p className="font-semibold">GitHub</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                <p className="font-semibold">Figma</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#132650] leading-tight">
              모든 정보가 한 곳에
              <br />
              모이고, 자동으로
              <br />
              정리된다면?
            </h2>
            <div className="space-y-6 text-xl text-gray-600">
              <p>"기획 변경은 자동 기록되고, 개발팀과 바로 공유된다면?"</p>
              <p>"목표-이슈 연결로 진행률이 한눈에!"</p>
            </div>
          </div>
          <div className="bg-[#132650] p-8 rounded-2xl text-white">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <p>정보 통합 완료</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <p>이력 추적 중</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <p>목표 시각화</p>
              </div>
              <div className="mt-8 bg-white/10 p-4 rounded-lg">
                <p className="text-sm">진행률: 85%</p>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#132650] mb-16">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-none shadow-lg">
              <CardContent className="space-y-4">
                <Search className="w-16 h-16 text-[#132650] mx-auto" />
                <h3 className="text-2xl font-bold text-[#132650]">🔍 정보 자동 통합</h3>
                <p className="text-gray-600">흩어진 정보를 한 곳에서 자동으로 수집하고 정리합니다</p>
              </CardContent>
            </Card>
            <Card className="p-8 border-none shadow-lg">
              <CardContent className="space-y-4">
                <BookOpen className="w-16 h-16 text-[#132650] mx-auto" />
                <h3 className="text-2xl font-bold text-[#132650]">📌 변경 이력 자동 기록</h3>
                <p className="text-gray-600">모든 변경사항을 자동으로 추적하고 기록합니다</p>
              </CardContent>
            </Card>
            <Card className="p-8 border-none shadow-lg">
              <CardContent className="space-y-4">
                <Target className="w-16 h-16 text-[#132650] mx-auto" />
                <h3 className="text-2xl font-bold text-[#132650]">🎯 목표-이슈 시각화</h3>
                <p className="text-gray-600">목표와 이슈를 연결하여 진행상황을 시각화합니다</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-xl text-gray-600">Slack, Notion, GitHub 연동으로 모든 흐름이 자동 정리됩니다.</p>
        </div>
      </section>

      {/* Use Case Section */}
      <section className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#132650] text-center mb-16">사용 시나리오</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-none shadow-lg">
              <CardContent className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">상황</h3>
                  <p>"디자이너가 디자인 수정사항을 회의 중 공유함"</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-[#132650]"></div>
                  <div className="w-4 h-4 bg-[#132650] rounded-full mx-2"></div>
                  <div className="w-8 h-0.5 bg-[#132650]"></div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">VECO 처리</h3>
                  <p>"Notion 회의록 → 자동으로 이슈화 → 개발팀 연동 완료"</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-8 border-none shadow-lg">
              <CardContent className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">상황</h3>
                  <p>"기획 변경 발생"</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-[#132650]"></div>
                  <div className="w-4 h-4 bg-[#132650] rounded-full mx-2"></div>
                  <div className="w-8 h-0.5 bg-[#132650]"></div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">VECO 처리</h3>
                  <p>"변경 내용 → 자동 문서화 → 팀 전체에 실시간 공유"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="min-h-screen flex items-center px-4 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#132650] mb-16">요금제</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-none shadow-lg">
              <CardContent className="space-y-6">
                <h3 className="text-3xl font-bold text-[#132650]">개인</h3>
                <div className="text-4xl font-bold text-[#132650]">월 9,900원</div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#132650] rounded-full mr-3"></div>
                    개인 프로젝트 관리
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#132650] rounded-full mr-3"></div>
                    기본 연동 기능
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#132650] rounded-full mr-3"></div>월 100개 이슈 추적
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="p-8 border-none shadow-lg border-2 border-[#132650]">
              <CardContent className="space-y-6">
                <h3 className="text-3xl font-bold text-[#132650]">팀</h3>
                <div className="text-4xl font-bold text-[#132650]">월 29,900원</div>
                <p className="text-sm text-gray-600">최대 5인</p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#132650] rounded-full mr-3"></div>팀 프로젝트 관리
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#132650] rounded-full mr-3"></div>
                    고급 연동 기능
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#132650] rounded-full mr-3"></div>
                    무제한 이슈 추적
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 p-6 bg-yellow-50 rounded-lg">
            <p className="text-lg font-semibold text-[#132650]">🎉 UMC 챌린저 전용 1달 무료 + 보상형 챌린지</p>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#132650] text-center">🎯 출시 알림 받기</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              출시 알림을 받으시려면 아래 정보를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="이름"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-gray-300"
              />
              <Input
                type="email"
                placeholder="이메일"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-gray-300"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-[#132650] hover:bg-[#2E4475] text-white py-3">
                등록하기
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-[#132650]">
                🎉 웨이팅 리스트 등록 완료!
                <br />
                출시되면 가장 먼저 알려드릴게요.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#132650] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h3 className="text-2xl font-bold">정보는 모으고, 목표는 사냥한다</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <div className="w-6 h-6 bg-white rounded"></div>
            </a>
          </div>
          <div className="text-sm text-gray-300">
            <a href="#" className="hover:underline">
              개인정보처리방침
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
