"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "YouTube Creator",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Krishna's video editing skills transformed my channel. The quality and creativity he brings to each project is exceptional.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Startup Founder",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Working with Krishna on our website redesign was a game-changer. His technical skills and eye for design are truly impressive.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Krishna delivered our project ahead of schedule and exceeded our expectations. His attention to detail and communication made the process smooth.",
      rating: 4,
    },
    {
      name: "Sarah Williams",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "The graphics Krishna designed for my brand have received countless compliments. His ability to understand my vision was remarkable.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Feedback from clients and collaborators I've had the pleasure of working with.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1 relative">
                    <Card className="bg-gray-800/40 backdrop-blur-sm border-0 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-12 w-12 border-2 border-blue-500">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                            <p className="text-sm text-gray-300">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-300 italic">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 opacity-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative mr-2 bg-gray-800 hover:bg-gray-700 border-0" />
              <CarouselNext className="relative ml-2 bg-gray-800 hover:bg-gray-700 border-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
