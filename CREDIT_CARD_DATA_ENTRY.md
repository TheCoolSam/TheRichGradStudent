# Credit Card Data Entry Guide

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

The graph automatically creates arrows between cards based on:

1. **Explicit relationships** via the "Related Cards" field
2. **Auto-generated connections** for cards with the same issuer or points program in adjacent levels

For example:
- Chase Rise → Freedom Flex/Unlimited (both arrows shown)
- Freedom cards → Chase Sapphire Preferred (arrows converge)
- Chase Sapphire Preferred splits to Reserve, Ink Cash, and Ink Unlimited

---

## Next Steps

1. Go to https://therichgradstudent.sanity.studio/
2. Open each credit card document
3. Fill in the "Issuer" field (required for all cards)
4. For Pro-level cards, set the "Sub-Category" 
5. Add "Related Cards" references for progression paths
6. Save each document

The graph will update automatically! 🎉
