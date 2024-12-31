'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const typewriterTexts = [
    "Welcome to VPACS",
    "Secure Vehicle Registration",
    "Efficient Passenger Management",
    "Advanced Access Control",
    "Streamlined Security Solutions"
]

const images = [
    'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/muscle-car-chromebook-wallpaper.jpg',
    'https://c4.wallpaperflare.com/wallpaper/157/340/999/car-sports-car-supercar-lamborghini-aventador-wallpaper-preview.jpg',
    'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/muscle-car-chromebook-wallpaper.jpg',
    'https://c4.wallpaperflare.com/wallpaper/157/340/999/car-sports-car-supercar-lamborghini-aventador-wallpaper-preview.jpg',
    'https://i.ytimg.com/vi/-Pkj1qIcK2Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDWMWoar6sqj1ZUNteiDL9UEC26tA'
]

function Left() {
    const [typewriterText, setTypewriterText] = useState('')
    const [typewriterIndex, setTypewriterIndex] = useState(0)
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        const typewriterInterval = setInterval(() => {
            const currentText = typewriterTexts[typewriterIndex]
            if (typewriterText.length < currentText.length) {
                setTypewriterText(currentText.slice(0, typewriterText.length + 1))
            } else {
                setTimeout(() => {
                    setTypewriterText('')
                    setTypewriterIndex((prevIndex) => (prevIndex + 1) % typewriterTexts.length)
                }, 1000)
            }
        }, 100)

        return () => clearInterval(typewriterInterval)
    }, [typewriterIndex, typewriterText])

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)

        return () => clearInterval(imageInterval)
    }, [])

    return (
        <div className="bg-gradient-to-br from-indigo-300 to-indigo-400 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl">
                <div className="flex flex-col md:flex-row">
                    {/* Left Panel - Fixed with Light Indigo */}
                    <div className="md:w-1/2 bg-indigo-200 h-screen text-white p-8 flex flex-col justify-between min-h-[600px] overflow-hidden fixed top-0 left-0">
                        <div>
                            <div className="flex items-center space-x-2 mb-6">
                                <Shield className="h-8 w-8 text-indigo-900" />
                                <h1 className="text-3xl font-bold text-indigo-900">VPACS</h1>
                            </div>
                            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Vehicle and Passenger Registration</h2>
                            <motion.div
                                key={typewriterIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-16 flex items-center"
                            >
                                <p className="text-xl text-indigo-900">{typewriterText}</p>
                            </motion.div>
                        </div>
                        <div className="mt-8">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={imageIndex}
                                    src={images[imageIndex]}
                                    alt={`VPACS feature ${imageIndex + 1}`}
                                    className="w-full h-full object-contain rounded-lg shadow-lg"  // Changed to object-contain
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Panel - Scrollable */}
                    <div className="md:w-1/2 bg-white p-8 overflow-auto h-screen">
                        {/* Your content for the right panel goes here */}
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Right Side Content</h2>
                        <p className="text-indigo-1000">
                            This part can scroll independently, while the left part will remain fixed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Left
