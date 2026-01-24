'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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

interface CreditCardNode {
  _id: string
  name: string
  slug: { current: string } | string
  category: 'new' | 'everyday' | 'travel' | 'pro'
  subCategory?: 'business' | 'luxury'
  issuer: string
  image: any
  pointsProgram?: { name: string }
  pointsProgramName?: string
  relatedCardsSlugs?: string[] | null
  rating: number
}

interface CreditCardGraphProps {
  cards: CreditCardNode[]
}

// Custom Card Node Component
function CardNode({ data }: any) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cardWidth = isMobile ? 160 : 280
  const cardHeight = isMobile ? 100 : 175

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    router.push(`/${data.slug}`)
  }

  // Get category colors
  const getCategoryColors = (category: string, subCategory?: string) => {
    const effectiveCategory = category === 'pro' && subCategory ? `pro-${subCategory}` : category

    switch (effectiveCategory) {
      case 'new':
        return {
          gradient: 'from-blue-600/20 via-blue-500/15 to-blue-600/20',
          border: 'border-blue-400',
          shadow: 'shadow-blue-500/50',
          glow: 'rgba(59, 130, 246, 0.5)'
        }
      case 'everyday':
        return {
          gradient: 'from-green-600/20 via-green-500/15 to-green-600/20',
          border: 'border-green-400',
          shadow: 'shadow-green-500/50',
          glow: 'rgba(34, 197, 94, 0.5)'
        }
      case 'travel':
        return {
          gradient: 'from-yellow-600/20 via-yellow-500/15 to-yellow-600/20',
          border: 'border-yellow-400',
          shadow: 'shadow-yellow-500/50',
          glow: 'rgba(234, 179, 8, 0.5)'
        }
      case 'pro-business':
        return {
          gradient: 'from-purple-600/20 via-purple-500/15 to-purple-600/20',
          border: 'border-purple-400',
          shadow: 'shadow-purple-500/50',
          glow: 'rgba(168, 85, 247, 0.5)'
        }
      case 'pro-luxury':
        return {
          gradient: 'from-red-600/20 via-red-500/15 to-red-600/20',
          border: 'border-red-400',
          shadow: 'shadow-red-500/50',
          glow: 'rgba(239, 68, 68, 0.5)'
        }
      default:
        return {
          gradient: 'from-gray-700/20 via-gray-600/15 to-gray-700/20',
          border: 'border-gray-400',
          shadow: 'shadow-gray-500/50',
          glow: 'rgba(156, 163, 175, 0.5)'
        }
    }
  }

  const colors = getCategoryColors(data.category, data.subCategory)

  return (
    <>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="block group" onClick={handleClick} onTouchEnd={handleClick}>
        <div
          className={`bg-gradient-to-br ${colors.gradient} rounded-2xl shadow-2xl ${colors.shadow} overflow-hidden border-4 ${colors.border} hover:border-white hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm relative`}
          style={{ width: cardWidth, height: cardHeight }}
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `inset 0 0 30px ${colors.glow}` }} />

          <div className="w-full h-full relative" style={{ aspectRatio: '16/10' }}>
            <img
              src={urlFor(data.image).width(560).height(350).quality(90).fit('fill').url()}
              alt={data.name}
              className="w-full h-full object-contain mix-blend-lighten p-3 group-hover:scale-105 transition-transform duration-300"
              style={{ filter: `drop-shadow(0 0 15px ${colors.glow})` }}
            />
          </div>
        </div>
        <div className="text-center mt-2 px-2">
          <p className="text-white font-semibold text-xs sm:text-sm line-clamp-2">
            {data.name}
          </p>
        </div>
      </div>
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

// Helper function to get arrow color based on target category
function getArrowColor(targetCategory: string, targetSubCategory?: string): string {
  const effectiveCategory = targetCategory === 'pro' && targetSubCategory ? `pro-${targetSubCategory}` : targetCategory

  switch (effectiveCategory) {
    case 'new':
      return '#3b82f6' // blue-500
    case 'everyday':
      return '#22c55e' // green-500
    case 'travel':
      return '#eab308' // yellow-500
    case 'pro-business':
      return '#a855f7' // purple-500
    case 'pro-luxury':
      return '#ef4444' // red-500
    default:
      return '#00ff88' // rgs-green
  }
}

// Helper to get family name (grouping key)
function getCardFamily(card: CreditCardNode): string {
  // Prefer points program name, fallback to issuer
  if (card.pointsProgram && card.pointsProgram.name) return card.pointsProgram.name
  if (card.pointsProgramName) return card.pointsProgramName
  return card.issuer || 'Other'
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

    // define families (Swimlanes)
    const families = Array.from(new Set(cards.map(c => getCardFamily(c)))).sort()

    // Group cards by Level AND Family
    const cardsByLevelAndFamily: Record<string, Record<string, CreditCardNode[]>> = {}

    // Initialize structure
    Object.keys(levels).forEach(lvl => {
      cardsByLevelAndFamily[lvl] = {}
      families.forEach(fam => {
        cardsByLevelAndFamily[lvl][fam] = []
      })
    })

    // Populate
    cards.forEach(card => {
      const lvl = (card.category === 'pro' && card.subCategory) ? `pro-${card.subCategory}` : card.category
      const fam = getCardFamily(card)
      if (cardsByLevelAndFamily[lvl] && cardsByLevelAndFamily[lvl][fam]) {
        cardsByLevelAndFamily[lvl][fam].push(card)
      }
    })

    // Calculate positions
    const generatedNodes: Node[] = []

    // Widen spacing significantly for clarity
    const familyWidth = isMobile ? 250 : 450
    const familySpacing = isMobile ? 50 : 150
    const startX = 0

    families.forEach((fam, famIndex) => {
      const familyStartX = startX + (famIndex * (familyWidth + familySpacing))

      // Add a Label Node for the Column
      if (fam) {
        generatedNodes.push({
          id: `label-${fam}`,
          type: 'default', // Standard text node
          position: {
            x: familyStartX + familyWidth / 2 - 100, // Center roughly
            y: -100, // Above the first level
          },
          data: { label: fam },
          style: {
            background: 'transparent',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '24px',
            width: 200,
            textAlign: 'center',
            fontFamily: 'var(--font-heading)'
          },
          draggable: false,
        })
      }

      Object.keys(levels).forEach(lvl => {
        const levelCards = cardsByLevelAndFamily[lvl][fam]
        if (levelCards.length === 0) return

        const cardSpacing = isMobile ? 160 : 300 // Much wider spacing between sibling cards
        const totalLevelWidth = (levelCards.length - 1) * cardSpacing

        // Center the group within the family width
        // familyStartX + (familyWidth/2) is the center line.
        // We shift left by totalLevelWidth/2

        levelCards.forEach((card, index) => {
          // Center Logic:
          // Center Point = familyStartX + familyWidth/2
          // Offset = (index - (count-1)/2) * spacing

          const centerPoint = familyStartX + (familyWidth / 2) - (isMobile ? 80 : 140) // Adjust for card width center
          const offset = (index - (levelCards.length - 1) / 2) * cardSpacing

          const xPos = centerPoint + offset

          generatedNodes.push({
            id: card._id,
            type: 'cardNode',
            position: {
              x: xPos,
              y: levels[lvl] + (index % 2 === 1 ? 80 : 0), // Increased vertical stagger for clarity
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
            draggable: !isMobile,
          })
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
              const arrowColor = getArrowColor(relatedCard.category, relatedCard.subCategory)
              generatedEdges.push({
                id: `${card._id}-${relatedCard._id}`,
                source: card._id,
                target: relatedCard._id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: arrowColor, strokeWidth: 4 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: arrowColor,
                  width: 30,
                  height: 30,
                },
              })
            }
          }
        })
      }
    })

    // Also auto-generate edges for cards with same issuer in adjacent levels WITHIN SAME FAMILY
    families.forEach(fam => {
      const levelOrder = ['new', 'everyday', 'travel', 'pro-business', 'pro-luxury']

      levelOrder.forEach((level, index) => {
        const nextLevel = levelOrder[index + 1]
        if (!nextLevel) return

        const sourceCards = cardsByLevelAndFamily[level]?.[fam] || []
        const targetCards = cardsByLevelAndFamily[nextLevel]?.[fam] || []

        if (sourceCards.length === 0 || targetCards.length === 0) return

        sourceCards.forEach(sourceCard => {
          targetCards.forEach(targetCard => {
            // Connect them!
            const edgeExists = generatedEdges.some(
              e => e.source === sourceCard._id && e.target === targetCard._id
            )

            if (!edgeExists) {
              const arrowColor = getArrowColor(targetCard.category, targetCard.subCategory)
              generatedEdges.push({
                id: `auto-${sourceCard._id}-${targetCard._id}`,
                source: sourceCard._id,
                target: targetCard._id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: arrowColor, strokeWidth: 3, opacity: 0.8 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: arrowColor,
                  width: 25,
                  height: 25,
                },
              })
            }
          })
        })
      })
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
              <span className="text-white/90">I&apos;m New Here</span>
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
