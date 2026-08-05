'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface Location {
  name: string
  state: string
  embed: string
  link: string
}

const locations: Location[] = [
  { name: 'New Delhi', state: 'Delhi NCR', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.5405407294!2d77.0441721!3d28.5275544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/New+Delhi,+Delhi/@28.5275544,77.0441721,11z/' },
  { name: 'Kolkata', state: 'West Bengal', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.64840660925!2d88.2649506!3d22.5355649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Kolkata,+West+Bengal/@22.5355649,88.2649506,12z/' },
  { name: 'Bengaluru', state: 'Karnataka', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124382.28446123246!2d77.457157!3d12.9882597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Bengaluru,+Karnataka/@12.9882597,77.457157,11z/' },
  { name: 'Bhubaneswar', state: 'Odisha', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119772.5464772187!2d84.2700179!3d20.2375561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a226aece9af3bfd%3A0x133625caa9cea81f!2sOdisha!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Odisha/@20.1754105,81.7950375,7z/' },
  { name: 'Mumbai', state: 'Maharashtra', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4846765.040772782!2d74.1275403!3d18.8047857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Maharashtra/@18.8047857,74.1275403,7z/' },
  { name: 'Neemuch', state: 'Madhya Pradesh', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1175775.4564471867!2d75.7790189!3d23.9525423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39667381d35aea05%3A0xe0106b0d4e701c1e!2sMadhya%20Pradesh!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Madhya+Pradesh/@23.9525423,75.7790189,7z/' },
  { name: 'Cuttack', state: 'Odisha', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119772.5464772187!2d84.2700179!3d20.2375561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a226aece9af3bfd%3A0x133625caa9cea81f!2sOdisha!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Odisha/@20.1754105,81.7950375,7z/' },
  { name: 'Jharsuguda', state: 'Odisha', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119772.5464772187!2d84.2700179!3d20.2375561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a226aece9af3bfd%3A0x133625caa9cea81f!2sOdisha!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Odisha/@20.1754105,81.7950375,7z/' },
  { name: 'Navi Mumbai', state: 'Maharashtra', embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4846765.040772782!2d74.1275403!3d18.8047857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v1', link: 'https://www.google.com/maps/place/Maharashtra/@18.8047857,74.1275403,7z/' },
]

const defaultEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1872250.4223864818!2d78.11906345!3d20.593684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1913d030c862b1%3A0xe8692722c5428e87!2sPro-Tech%20Fire%20and%20Safety!5e0!3m2!1sen!2sin!4v1'

export default function ProjectsMapEmbed() {
  const [active, setActive] = useState<Location | null>(null)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="overflow-hidden rounded-2xl shadow-lg lg:col-span-2">
        <motion.iframe
          key={active ? active.name : 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={active ? active.embed : defaultEmbed}
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={active ? `Pro-Tech Projects - ${active.name}` : 'Pro-Tech Fire & Safety Pan-India Projects'}
          className="rounded-2xl"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-navy-900 dark:text-white">
              Project Locations
            </h3>
            <p className="text-sm text-navy-500 dark:text-navy-300">
              Click to view on map
            </p>
          </div>
          {active && (
            <a
              href={active.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors shrink-0"
            >
              Open in Maps →
            </a>
          )}
        </div>
        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-2">
          {locations.map((loc) => {
            const isActive = active?.name === loc.name
            return (
              <button
                key={loc.name}
                onClick={() => setActive(isActive ? null : loc)}
                className={`w-full group flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 shadow-md'
                    : 'border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-gold-200/50 dark:hover:border-gold-700/50'
                }`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gold-500 text-white'
                    : 'bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400'
                }`}>
                  <MapPin size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors truncate ${
                    isActive ? 'text-gold-700 dark:text-gold-400' : 'text-navy-900 dark:text-white group-hover:text-gold-700 dark:group-hover:text-gold-400'
                  }`}>
                    {loc.name}
                  </p>
                  <p className="text-xs text-navy-400 dark:text-navy-400 truncate">{loc.state}</p>
                </div>
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
