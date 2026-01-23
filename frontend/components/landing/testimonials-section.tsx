// components/landing/testimonials-section.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    company: "Google",
    content:
      "This platform helped me transition from frontend to full-stack in just 6 months. The roadmaps are incredibly detailed and the real-world projects gave me the confidence I needed.",
    avatar: "/avatars/01.png",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Software Engineer",
    company: "Meta",
    content:
      "The GitHub integration is brilliant! I contributed to 15+ open-source projects while following my learning path. Landed my dream job thanks to the portfolio I built.",
    avatar: "/avatars/02.png",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "DevOps Engineer",
    company: "Amazon",
    content:
      "Best learning platform I've used. The personalized roadmap adapted to my pace, and the skill assessments kept me accountable. Highly recommend!",
    avatar: "/avatars/03.png",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "ML Engineer",
    company: "OpenAI",
    content:
      "From bootcamp graduate to ML engineer in 8 months. The curated resources and project-based learning approach made all the difference.",
    avatar: "/avatars/04.png",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "Netflix",
    content:
      "The career guidance feature is amazing! It recommended skills I didn't even know I needed. Now I'm working at my dream company.",
    avatar: "/avatars/05.png",
    rating: 5,
  },
  {
    name: "James Thompson",
    role: "Backend Developer",
    company: "Stripe",
    content:
      "Real-world projects made the difference. Instead of just tutorials, I solved actual issues and built a portfolio that impressed recruiters.",
    avatar: "/avatars/06.png",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="relative bg-[#0A0A0A] py-20 sm:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Success Stories from Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-lg text-[#CCCCCC] leading-relaxed">
            Join thousands of learners who transformed their careers with our
            platform.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="group h-full border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-lg transition-all hover:border-[#3A3A3A] hover:shadow-xl hover:shadow-black/40 overflow-hidden relative">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardContent className="pt-6 pb-6 relative flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="h-12 w-12 text-white" />
                    </div>

                    {/* Rating Stars */}
                    <div className="mb-4 flex gap-1 relative z-10">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>

                    {/* Testimonial Content */}
                    <p className="mb-6 text-sm text-[#CCCCCC] leading-relaxed flex-grow relative z-10">
                      "{testimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#2A2A2A] relative z-10">
                      <Avatar className="border-2 border-[#2A2A2A]">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-white font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-[#888888]">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-[#666666]">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="hidden md:flex -left-12 bg-[#161616] border-[#2A2A2A] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A]" />
          <CarouselNext className="hidden md:flex -right-12 bg-[#161616] border-[#2A2A2A] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A]" />
        </Carousel>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A]">
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-sm text-[#888888]">Active Learners</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A]">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-[#888888]">Projects</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A]">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-sm text-[#888888]">Success Rate</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A]">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-sm text-[#888888]">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
