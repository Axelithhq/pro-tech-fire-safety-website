'use client'

import { motion } from 'framer-motion'

export default function ContactMapEmbed() {
  return (
    <motion.a
      href="https://www.google.com/maps/place/Pro-Tech+Fire+and+Safety/@20.474438,85.8760717,19z/data=!3m1!4b1!4m6!3m5!1s0x3a1913d030c862b1:0xe8692722c5428e87!8m2!3d20.4744367!4d85.8767154!16s%2Fg%2F11t10_tjpd"
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.357444192128!2d85.8741337!3d20.4744367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1913d030c862b1%3A0xe8692722c5428e87!2sPro-Tech%20Fire%20and%20Safety!5e0!3m2!1sen!2sin!4v1"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Pro-Tech Fire & Safety Office Location"
        className="rounded-2xl"
      />
    </motion.a>
  )
}
