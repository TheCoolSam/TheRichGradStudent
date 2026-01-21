# Credit Card Data Entry Guide

## ⚠️ IMPORTANT: Arrow Connection Rules

**Arrows only appear between cards in ADJACENT levels.** This means:
- ✅ New → Everyday (works)
- ✅ Everyday → Travel (works)
- ✅ Travel → Pro-Business or Pro-Luxury (works)
- ✅ Pro-Business → Pro-Luxury (works)
- ❌ New → Travel (skips Everyday, won't work)
- ❌ Everyday → Pro-Business (skips Travel, won't work)

If you add a related card but don't see an arrow, check the browser console for detailed debugging information showing why the connection failed.

---

## Required Fields for Millionaire Guide Graph

For each credit card in Sanity, you need to populate these new fields:

### 1. **Issuer** (Required)
The bank that provides the card.

### 2. **Sub-Category** (Optional - Pro cards only)
For cards with category = "pro", specify if they're business or luxury.

### 3. **Related Cards** (Optional but Recommended)
Cards that come before/after this one in a recommended progression path.

---

## Complete Mapping List

### Chase Cards

**Chase Rise**
- Issuer: `Chase`
- Category: `new`
- Sub-Category: (leave empty)
- Related Cards: `Freedom Flex`, `Freedom Unlimited`

**Freedom Flex**
- Issuer: `Chase`
- Category: `everyday`
- Sub-Category: (leave empty)
- Related Cards: `Chase Sapphire Preferred`

**Freedom Unlimited**
- Issuer: `Chase`
- Category: `everyday`
- Sub-Category: (leave empty)
- Related Cards: `Chase Sapphire Preferred`

**Chase Sapphire Preferred**
- Issuer: `Chase`
- Category: `travel`
- Sub-Category: (leave empty)
- Related Cards: `Chase Sapphire Reserve`, `Chase Business Ink Cash`, `Chase Business Ink Unlimited`

**Chase Sapphire Reserve**
- Issuer: `Chase`
- Category: `pro`
- Sub-Category: `luxury`
- Related Cards: (none)

**Chase Business Ink Cash**
- Issuer: `Chase`
- Category: `pro`
- Sub-Category: `business`
- Related Cards: (none)

**Chase Business Ink Unlimited**
- Issuer: `Chase`
- Category: `pro`
- Sub-Category: `business`
- Related Cards: (none)

---

### American Express Cards

**Blue Cash Everyday® Card**
- Issuer: `American Express`
- Category: `everyday`
- Sub-Category: (leave empty)
- Related Cards: (none - no Amex progression in this set)

---

### Discover Cards

**Discover Student**
- Issuer: `Discover`
- Category: `new`
- Sub-Category: (leave empty)
- Related Cards: (none - no Discover progression in this set)

---

### Citi Cards

**Citi Custom Cash**
- Issuer: `Citi`
- Category: `everyday`
- Sub-Category: (leave empty)
- Related Cards: (none - no Citi progression in this set)

---

### Capital One Cards

**Capital One Venture X**
- Issuer: `Capital One`
- Category: `travel`
- Sub-Category: (leave empty)
- Related Cards: (none - no Capital One progression in this set)

---

### Marriott Cards

**Marriott Bonvoy Business**
- Issuer: `Chase`
- Category: `pro`
- Sub-Category: `business`
- Related Cards: `Marriott Brilliant`

**Marriott Brilliant**
- Issuer: `Chase`
- Category: `pro`
- Sub-Category: `luxury`
- Related Cards: (none)

---

### Hilton Cards

**Hilton Honors Surpass**
- Issuer: `American Express`
- Category: `travel`
- Sub-Category: (leave empty)
- Related Cards: (none)

---

### IHG Cards

**IHG Preferred**
- Issuer: `Chase`
- Category: `travel`
- Sub-Category: (leave empty)
- Related Cards: (none)

---

### Hyatt Cards

**World of Hyatt Credit Card**
- Issuer: `Chase`
- Category: `travel`
- Sub-Category: (leave empty)
- Related Cards: (none)

---

### BILT Cards

**BILT Palladium**
- Issuer: `Wells Fargo`
- Category: `pro`
- Sub-Category: `luxury`
- Related Cards: (none)

---

## Visual Flow Preview

```
Level 1: I'm New Here
├── Chase Rise (Chase)
└── Discover Student (Discover)
    ↓ (arrows)
    
Level 2: Everyday Earning
├── Freedom Flex (Chase) ←─── from Chase Rise
├── Freedom Unlimited (Chase) ←─── from Chase Rise
├── Blue Cash Everyday (Amex)
└── Citi Custom Cash (Citi)
    ↓ (arrows)
    
Level 3: Travel Cards
├── Chase Sapphire Preferred (Chase) ←─── from Freedom Flex/Unlimited
├── Capital One Venture X (Capital One)
├── Hilton Honors Surpass (Amex)
├── IHG Preferred (Chase)
└── World of Hyatt (Chase)
    ↓ (arrows)
    
Level 4: Pro - Business
├── Chase Business Ink Cash (Chase) ←─── from Sapphire Preferred
├── Chase Business Ink Unlimited (Chase) ←─── from Sapphire Preferred
└── Marriott Bonvoy Business (Chase)
    ↓ (arrows)
    
Level 5: Pro - Luxury
├── Chase Sapphire Reserve (Chase) ←─── from Sapphire Preferred
├── Marriott Brilliant (Chase) ←─── from Marriott Business
└── BILT Palladium (Wells Fargo)
```

---

## How Arrows Work

The graph creates arrows between cards in **two ways**:

### 1. **Explicit Relationships** (via the "Related Cards" field)
- ⚠️ **Only works between ADJACENT levels** (exactly 1 level apart)
- You add the relationship in Sanity by selecting related cards
- Creates bold, bright green arrows (strokeWidth: 3)
- Direction matters: Adding Card B to Card A's relatedCards creates A → B

### 2. **Auto-Generated Connections** (same issuer/program)
- Automatically connects cards with the same `issuer` OR `pointsProgram`
- Also **only between adjacent levels**
- Creates lighter, thinner arrows (strokeWidth: 2, opacity: 0.7)
- Helps show progression within the same bank or rewards program

### Debugging Your Arrows

If arrows don't appear:
1. Open browser console (F12) and navigate to /millionaire-guide
2. Look for the "=== CREDIT CARD GRAPH DEBUG ===" section
3. Check each relationship attempt for:
   - "Found card: NOT FOUND" = slug mismatch
   - "Level Difference: 2" or higher = not adjacent
   - "Is Adjacent? ✗ NO" = explains why arrow wasn't created

### Examples:

**✅ This Works:**
- Chase Rise (new) → Freedom Flex (everyday) = 1 level apart ✓
- Freedom cards (everyday) → Sapphire Preferred (travel) = 1 level apart ✓
- Marriott Business (pro-business) → Marriott Brilliant (pro-luxury) = 1 level apart ✓

**❌ This Won't Work:**
- Chase Rise (new) → Sapphire Preferred (travel) = 2 levels apart ✗
- Freedom Flex (everyday) → Sapphire Reserve (pro-luxury) = 3 levels apart ✗
- Sapphire Preferred (travel) → Chase Ink Cash (pro-business) = 1 level apart ✓ **BUT different program type**

---

## Next Steps

1. Go to https://therichgradstudent.sanity.studio/
2. Open each credit card document
3. Fill in the "Issuer" field (required for all cards)
4. For Pro-level cards, set the "Sub-Category" 
5. Add "Related Cards" references for progression paths
6. Save each document

The graph will update automatically! 🎉
