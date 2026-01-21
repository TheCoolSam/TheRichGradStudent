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
  Handle,
  Position,
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

  const cardWidth = isMobile ? 160 : 280
  const cardHeight = isMobile ? 100 : 175

  return (
    <>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Link href={`/${data.slug}`} className="block group">
        <div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border-4 border-rgs-green/50 hover:border-rgs-light-green hover:shadow-rgs-green/30 transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-sm"
          style={{ width: cardWidth, height: cardHeight }}
        >
          <div className="w-full h-full relative" style={{ aspectRatio: '16/10' }}>
            <img
              src={urlFor(data.image).width(560).height(350).quality(90).fit('fill').url()}
              alt={data.name}
              className="w-full h-full object-contain mix-blend-screen p-2"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))' }}
            />
          </div>
        </div>
        <div className="text-center mt-2 px-2">
          <p className="text-white font-semibold text-xs sm:text-sm line-clamp-2">
            {data.name}
          </p>
        </div>
      </Link>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </>
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
    
    // Debug logging (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('=== CREDIT CARD GRAPH DEBUG ===')
      console.log('Total cards:', cards.length)
      cards.forEach(card => {
        console.log(`\nCard: ${card.name}`)
        console.log(`  - Category: ${card.category}${card.subCategory ? `-${card.subCategory}` : ''}`)
        console.log(`  - Slug: ${getSlugString(card.slug)}`)
        console.log(`  - Issuer: ${card.issuer}`)
        console.log(`  - Points Program: ${card.pointsProgramName || 'N/A'}`)
        console.log(`  - Related Slugs:`, card.relatedCardsSlugs || [])
      })
      console.log('\n=== CHECKING RELATIONSHIPS ===')
    }
    
    cards.forEach(card => {
      if (card.relatedCardsSlugs && Array.isArray(card.relatedCardsSlugs) && card.relatedCardsSlugs.length > 0) {
        card.relatedCardsSlugs.forEach(relatedSlug => {
          if (!relatedSlug) return // Skip if slug is null/undefined
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`\nChecking: ${card.name} -> ${relatedSlug}`)
          }
          
          const relatedCard = cards.find(c => getSlugString(c.slug) === relatedSlug)
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`  Found card: ${relatedCard?.name || 'NOT FOUND'}`)
          }
          
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
            
            if (process.env.NODE_ENV === 'development') {
              const levelDiff = Math.abs(sourceIdx - targetIdx)
              console.log(`  Source Level: ${sourceLevel} (index ${sourceIdx})`)
              console.log(`  Target Level: ${targetLevel} (index ${targetIdx})`)
              console.log(`  Level Difference: ${levelDiff}`)
              console.log(`  Is Adjacent? ${levelDiff === 1 ? '✓ YES - Arrow will be created' : '✗ NO - Arrow will NOT be created (not adjacent)'}`)
            }

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

    if (process.env.NODE_ENV === 'development') {
      console.log('\n=== GENERATED EDGES SUMMARY ===')
      console.log('Total edges:', generatedEdges.length)
      generatedEdges.forEach(edge => {
        const source = cards.find(c => c._id === edge.source)
        const target = cards.find(c => c._id === edge.target)
        const edgeType = edge.id.startsWith('auto-') ? 'AUTO' : 'EXPLICIT'
        console.log(`${source?.name} → ${target?.name} (${edgeType})`)
      })
      console.log('=== DEBUG END ===\n')
    }

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
