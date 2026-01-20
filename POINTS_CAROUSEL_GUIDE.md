# Points Value Carousel - Credit Card Display Guide

## 🎯 How It Works

The points value carousel now displays the **top 3 credit cards** for each points program in a pyramid formation!

---

## 📸 Card Display

Each points program card in the carousel shows:

- **Program logo** (top)
- **Program name**
- **Base value** (e.g., 1.25¢ per point)
- **Best redemption value** (e.g., 2.5¢ per point)
- **Top 3 credit cards** in pyramid formation (bottom)

### Pyramid Layout:

```
     [Card 1]        ← Top rated card (centered)
   [Card 2] [Card 3]  ← 2nd and 3rd best cards
```

---

## 🏆 How Cards Are Ranked

Cards are automatically ranked by their **Signup Bonus Rating**:

1. **Great** / **RGS Wallet** = 4 points (highest)
2. **Good** = 3 points
3. **Poor** = 2 points
4. No rating = 1 point

If ratings are tied, cards are sorted by **Published Date** (newest first).

---

## 🔗 Setting Up the Connection

### Step 1: Create Points Programs

In Sanity Studio, go to **Point Values** and create programs:

- Chase Ultimate Rewards
- Amex Membership Rewards
- Capital One Miles
- etc.

Make sure each has:

- Name
- Logo
- Base Value
- Best Redemption Value
- Display Order

### Step 2: Create Credit Cards

In Sanity Studio, go to **Credit Card Reviews** and:

1. Fill out all card details
2. **Select the Points Program** in the dropdown
3. Set the **Signup Bonus Rating** (Great/Good/Poor/RGS Wallet)
4. Publish the card

### Step 3: Automatic Display

The carousel will automatically:

- Find all cards linked to each points program
- Rank them by rating
- Show the top 3 in the pyramid
- Update in real-time when you publish changes

---

## 📝 Example Setup

### Point Value Document:

```
Name: Chase Ultimate Rewards
Base Value: 1.25
Best Redemption: 2.5
Order: 1
```

### Credit Cards:

```
Card 1: Chase Sapphire Preferred
Points Program: → Chase Ultimate Rewards
Signup Bonus Rating: Great  ✅ (Shows as #1)

Card 2: Chase Freedom Flex
Points Program: → Chase Ultimate Rewards
Signup Bonus Rating: Good   ✅ (Shows as #2)

Card 3: Chase Freedom Unlimited
Points Program: → Chase Ultimate Rewards
Signup Bonus Rating: Good   ✅ (Shows as #3)
```

The pyramid will display these 3 cards under "Chase Ultimate Rewards" in the carousel!

---

## 🎨 Visual Details

- **Card 1** (Top): 64x40px
- **Cards 2 & 3** (Bottom): 56x36px each
- All cards have rounded corners and shadows
- Images are automatically optimized by Next.js

---

## 💡 Pro Tips

1. **Rate cards accurately** - Your best cards will be featured!
2. **Use high-quality card images** - They'll be displayed prominently
3. **Update ratings** - Changes appear immediately after publishing
4. **No cards yet?** - The pyramid won't show until you have at least 1 card linked

---

## 🔄 How Updates Work

When you:

1. ✅ Publish a new credit card → Carousel updates automatically
2. ✅ Change a card's rating → Pyramid reorders on next page load
3. ✅ Add a new points program → New carousel card appears
4. ✅ Update card images → New images display immediately

Everything is **real-time** and **automatic**! 🚀
