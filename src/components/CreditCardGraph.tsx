'use client'

import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { urlFor } from '@/lib/image'
import Link from 'next/link'

interface CreditCardNode {
  _id: string
  name: string
  slug: { current: string } | string
  category: 'new' | 'everyday' | 'travel' | 'pro'
  subCategory?: 'business' | 'luxury'
  issuer: string
  image: any
  pointsProgramName?: string
  relatedCardsSlugs?: string[] | null
  rating: number
}

interface CreditCardGraphProps {
  cards: CreditCardNode[]
}

// Custom Card Node Component
function CardNode({ data }: any) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cardWidth = isMobile ? 150 : 250
  const cardHeight = isMobile ? 95 : 157

  return (
    <Link href={`/${data.slug}`} className="block group">
      <div 
        className="bg-white rounded-lg shadow-xl overflow-hidden border-4 border-rgs-green hover:border-rgs-light-green transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{ width: cardWidth, height: cardHeight }}
      >
        <img
          src={urlFor(data.image).width(cardWidth * 2).height(cardHeight * 2).url()}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center mt-2 px-2">
        <p className="text-white font-semibold text-xs sm:text-sm line-clamp-2">
          {data.name}
        </p>
      </div>
    </Link>
  )
}

const nodeTypes = {
  cardNode: CardNode,
}

// Helper function to safely get slug string
function getSlugString(slug: { current: string } | string): string {
  return typeof slug === 'string' ? slug : slug.current
}

export default function CreditCardGraph({ cards }: CreditCardGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate nodes and edges from cards
  useEffect(() => {
    if (!cards || cards.length === 0) return

    // Define level positions (Y coordinate)
    const levels: Record<string, number> = {
      new: 0,
      everyday: 400,
      travel: 800,
      'pro-business': 1200,
      'pro-luxury': 1600,
    }

    // Group cards by effective level
    const cardsByLevel: Record<string, CreditCardNode[]> = {
      new: [],
      everyday: [],
      travel: [],
      'pro-business': [],
      'pro-luxury': [],
    }

    cards.forEach(card => {
      if (card.category === 'pro' && card.subCategory) {
        cardsByLevel[`pro-${card.subCategory}`].push(card)
      } else {
        cardsByLevel[card.category].push(card)
      }
    })

    // Calculate horizontal spacing and create nodes
    const generatedNodes: Node[] = []
    const horizontalSpacing = isMobile ? 200 : 350
    const startX = isMobile ? 100 : 200

    Object.entries(cardsByLevel).forEach(([level, levelCards]) => {
      const totalWidth = (levelCards.length - 1) * horizontalSpacing
      const startXPos = startX - totalWidth / 2

      levelCards.forEach((card, index) => {
        generatedNodes.push({
          id: card._id,
          type: 'cardNode',
          position: {
            x: startXPos + index * horizontalSpacing,
            y: levels[level],
          },
          data: {
            name: card.name,
            slug: getSlugString(card.slug),
            image: card.image,
            issuer: card.issuer,
            pointsProgram: card.pointsProgramName,
            category: card.category,
            subCategory: card.subCategory,
          },
          draggable: true,
        })
      })
    })

    // Generate edges based on relationships
    const generatedEdges: Edge[] = []
    
    cards.forEach(card => {
      if (card.relatedCardsSlugs && Array.isArray(card.relatedCardsSlugs) && card.relatedCardsSlugs.length > 0) {
        card.relatedCardsSlugs.forEach(relatedSlug => {
          if (!relatedSlug) return // Skip if slug is null/undefined
          
          const relatedCard = cards.find(c => getSlugString(c.slug) === relatedSlug)
          if (relatedCard) {
            // Only create edge if cards are in adjacent levels
            const sourceLevel = card.category === 'pro' && card.subCategory 
              ? `pro-${card.subCategory}` 
              : card.category
            const targetLevel = relatedCard.category === 'pro' && relatedCard.subCategory 
              ? `pro-${relatedCard.subCategory}` 
              : relatedCard.category

            const levelOrder = ['new', 'everyday', 'travel', 'pro-business', 'pro-luxury']
            const sourceIdx = levelOrder.indexOf(sourceLevel)
            const targetIdx = levelOrder.indexOf(targetLevel)

            // Only connect adjacent levels
            if (Math.abs(sourceIdx - targetIdx) === 1) {
              generatedEdges.push({
                id: `${card._id}-${relatedCard._id}`,
                source: card._id,
                target: relatedCard._id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#00ff88', strokeWidth: 3 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: '#00ff88',
                  width: 25,
                  height: 25,
                },
              })
            }
          }
        })
      }
    })

    // Also auto-generate edges for cards with same issuer in adjacent levels
    Object.entries(cardsByLevel).forEach(([level, levelCards]) => {
      const levelOrder = ['new', 'everyday', 'travel', 'pro-business', 'pro-luxury']
      const currentIdx = levelOrder.indexOf(level)
      const nextLevel = levelOrder[currentIdx + 1]
      
      if (nextLevel && cardsByLevel[nextLevel]) {
        levelCards.forEach(sourceCard => {
          cardsByLevel[nextLevel].forEach(targetCard => {
            // Connect if same issuer or same points program
            if ((sourceCard.issuer && targetCard.issuer && sourceCard.issuer === targetCard.issuer) || 
                (sourceCard.pointsProgramName && targetCard.pointsProgramName && sourceCard.pointsProgramName === targetCard.pointsProgramName)) {
              
              // Check if edge doesn't already exist
              const edgeExists = generatedEdges.some(
                e => e.source === sourceCard._id && e.target === targetCard._id
              )
              
              if (!edgeExists) {
                generatedEdges.push({
                  id: `auto-${sourceCard._id}-${targetCard._id}`,
                  source: sourceCard._id,
                  target: targetCard._id,
                  type: 'smoothstep',
                  animated: true,
                  style: { stroke: '#00ff88', strokeWidth: 2, opacity: 0.7 },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#00ff88',
                    width: 20,
                    height: 20,
                  },
                })
              }
            }
          })
        })
      }
    })

    setNodes(generatedNodes)
    setEdges(generatedEdges)
  }, [cards, isMobile, setNodes, setEdges])

  return (
    <div className="w-full h-[800px] sm:h-[1000px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-rgs-green/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-rgs-dark-green/20"
      >
        <Background color="#00ff88" gap={16} size={1} />
        <Controls className="bg-rgs-black/80 border border-rgs-green/50" />
        
        <Panel position="top-left" className="bg-rgs-black/90 backdrop-blur-sm p-4 rounded-lg border border-rgs-green/50 m-4">
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="text-white font-bold mb-2 text-sm sm:text-base">Experience Levels</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded"></div>
              <span className="text-white/90">I'm New Here</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span className="text-white/90">Everyday Earning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded"></div>
              <span className="text-white/90">Travel Cards</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded"></div>
              <span className="text-white/90">Pro - Business</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <span className="text-white/90">Pro - Luxury</span>
            </div>
          </div>
        </Panel>

        <Panel position="bottom-right" className="bg-rgs-black/90 backdrop-blur-sm p-3 rounded-lg border border-rgs-green/50 m-4">
          <p className="text-white/80 text-xs sm:text-sm">
            <span className="text-rgs-light-green font-bold">💡 Tip:</span> Click any card to view details
          </p>
        </Panel>
      </ReactFlow>
    </div>
  )
}
