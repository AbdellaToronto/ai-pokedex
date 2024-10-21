"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { motion } from "framer-motion";

interface Section {
  content: string;
  scrollable?: boolean;
}

interface PokemonBadgeCardProps {
  imageUrl?: string;
  header?: string;
  subheader?: string;
  sections?: Section[];
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
}

export function PokemonBadgeCard({
  imageUrl,
  header,
  subheader,
  sections = [],
  backgroundColor = "bg-primary",
  textColor = "text-primary-foreground",
  width = 200,
  height = 150,
}: PokemonBadgeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="mb-4 flex justify-center"
    >
      <Card
        className={`${backgroundColor} ${textColor} overflow-hidden relative group`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center mb-2">
          {imageUrl && (
            <div className="mr-3">
              <Image
                src={imageUrl}
                alt="Badge Image"
                width={width / 3}
                height={height / 3}
                objectFit="contain"
              />
            </div>
          )}
          <div>
            {header && (
              <h3 style={{ fontSize: `${height / 10}px`, fontWeight: "bold" }}>
                {header}
              </h3>
            )}
            {subheader && (
              <p style={{ fontSize: `${height / 14}px` }}>{subheader}</p>
            )}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {sections.map((section, index) => (
            <div
              key={index}
              className="text-xs"
              style={{ fontSize: `${height / 16}px` }}
            >
              {section.scrollable ? (
                <ScrollArea className="h-full">
                  <div className="p-1">{section.content}</div>
                </ScrollArea>
              ) : (
                <div>{section.content}</div>
              )}
            </div>
          ))}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{ mixBlendMode: "overlay" }}
        />
      </Card>
    </motion.div>
  );
}
