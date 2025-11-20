import React from 'react'
import { Skeleton } from './ui/Skeleton'

export function PlanosLeituraSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Título e Descrição */}
        <div className="mb-8">
          <Skeleton className="h-10 w-80 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-full">
              <div className="border rounded-lg p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-5 w-full mb-4" />
                
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PlanoDetalheSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Botão Voltar e Badge */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>

        {/* Card de Progresso */}
        <div className="border rounded-lg p-6 mb-6">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-full mb-4" />
          <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-4 w-12 mt-1" />
          </div>
        </div>

        {/* Lista de Lições */}
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
