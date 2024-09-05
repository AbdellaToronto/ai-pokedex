'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

interface Section {
  content: string
  scrollable?: boolean
}

interface PokemonBadgeCardProps {
  imageUrl?: string
  header?: string
  subheader?: string
  sections?: Section[]
  backgroundColor?: string
  textColor?: string
  width?: number
  height?: number
}

export function PokemonBadgeCard({
  imageUrl,
  header,
  subheader,
  sections = [],
  backgroundColor = 'bg-primary',
  textColor = 'text-primary-foreground',
  width = 200,
  height = 150,
}: PokemonBadgeCardProps) {
  const aspectRatio = width / height
  const gridTemplateAreas = `
    "image header"
    "image subheader"
    "section1 section2"
    "section3 section4"
  `

  return (
    <Card 
      className={`${backgroundColor} ${textColor} overflow-hidden`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto 1fr 1fr',
        gridTemplateAreas: gridTemplateAreas,
        gap: '4px',
        padding: '8px',
      }}
    >
      {imageUrl && (
        <div style={{ gridArea: 'image', alignSelf: 'center', justifySelf: 'center' }}>
          <Image src={imageUrl} alt="Badge Image" width={width / 2} height={height / 2} objectFit="contain" />
        </div>
      )}
      {header && (
        <div style={{ gridArea: 'header', fontSize: `${height / 10}px`, fontWeight: 'bold' }}>
          {header}
        </div>
      )}
      {subheader && (
        <div style={{ gridArea: 'subheader', fontSize: `${height / 12}px` }}>
          {subheader}
        </div>
      )}
      {sections.map((section, index) => (
        <div key={index} style={{ gridArea: `section${index + 1}`, fontSize: `${height / 15}px` }}>
          {section.scrollable ? (
            <ScrollArea className="h-full">
              <div className="p-2">{section.content}</div>
            </ScrollArea>
          ) : (
            <div>{section.content}</div>
          )}
        </div>
      ))}
    </Card>
  )
}