# Points Program Guide

## How Points Programs Work in The Rich Grad Student

---

## 🎯 Overview

The site now connects **Credit Card Reviews** with **Points Programs** to show users the value of the points they'll earn.

---

## 📊 Two-Part System

### 1. **Point Values Section** (Homepage Carousel)

This is where you define the value of different points programs.

**Location:** Go to Sanity Studio → **Point Values**

**Create ONE document with:**
- **Section Title**: "Maximize Your Points Value"
- **Cards**: Add one card for each points program

**Example Cards:**

| Program Name      | Base Value (¢) | Best Redemption (¢) | Display Order |
|-------------------|----------------|---------------------|---------------|
| Chase             | 2              | 7                   | 1             |
| Bilt              | 2              | 4                   | 2             |
| Capital One       | 1.5            | 6                   | 3             |
| Amex              | 1.5            | 5                   | 4             |
| American Airlines | 1.5            | 4.5                 | 5             |
| United            | 1.3            | 4                   | 6             |
| Southwest         | 1.4            | 1.5                 | 7             |
| Hilton            | 0.5            | 0.8                 | 8             |
| Marriott          | 0.8            | 1.2                 | 9             |
| Hyatt             | 1.5            | 2.5                 | 10            |

---

### 2. **Credit Card Reviews** (Select Points Program)

When creating a credit card review, you now select which points program it uses.

**Location:** Go to Sanity Studio → **Credit Card Reviews** → Create new

**New Field: "Points Program"**

You'll see a dropdown with these options:
- **Chase Ultimate Rewards** → Links to "Chase" in Point Values
- **Bilt Rewards** → Links to "Bilt" in Point Values
- **Capital One Miles** → Links to "Capital One" in Point Values
- **American Express Membership Rewards** → Links to "Amex" in Point Values
- **American Airlines AAdvantage** → Links to "American Airlines" in Point Values
- **United MileagePlus** → Links to "United" in Point Values
- **Southwest Rapid Rewards** → Links to "Southwest" in Point Values
- **Hilton Honors** → Links to "Hilton" in Point Values
- **Marriott Bonvoy** → Links to "Marriott" in Point Values
- **World of Hyatt** → Links to "Hyatt" in Point Values
- **Cash Back (No Points)** → For pure cash back cards
- **Other** → For other programs

---

## 🔄 How It All Works Together

### Example Workflow:

1. **You create a Points Value card for "Chase":**
   - Base Value: 2¢
   - Best Redemption: 7¢

2. **You create a Credit Card Review for "Chase Sapphire Preferred":**
   - Select Points Program: **Chase Ultimate Rewards**
   - Travel Multiplier: 5%
   - Dining Multiplier: 5%

3. **On the card's page, it shows:**
   - **Quick Info:** "Points Program: Chase Ultimate Rewards"
   - **Value Table:** Shows 5% travel earning → 10% at 2cpp → 35% at 7cpp

4. **Homepage carousel shows:**
   - Chase card with 2¢ base / 7¢ best redemption values

---

## 💡 Important Notes

### **The names MUST match!**

For the connection to work automatically in the future:
- If you add a new points program to the **Points Program** dropdown in Credit Card Reviews
- You should also add a matching card to **Point Values**

**Example:**
- Credit Card dropdown: "Citi ThankYou Points"
- Point Values card name: "Citi"

### **Updating Point Values**

When you change a points value in Sanity (e.g., update Chase from 2¢ to 2.5¢):
- ✅ Homepage carousel updates automatically (refresh page)
- ✅ All cards using that program stay linked
- ✅ No need to update individual card reviews

---

## 🎨 What Gets Displayed

### On Credit Card Pages:

**Quick Info Box** now shows:
```
Quick Info
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Points Program: Chase Ultimate Rewards
Spend Requirement: Spend $6,000 in 3 months
APR Offer: 0% APR first 12 months
```

### On Homepage:

The **Points Value Carousel** shows all programs with their redemption values, helping users understand which points are worth the most.

---

## 📝 Step-by-Step: Adding a New Points Program

### Step 1: Add to Point Values

1. Go to Sanity Studio → **Point Values**
2. Edit the existing document
3. Add a new card:
   - **Name**: "Citi" (short name)
   - **Logo**: Upload Citi logo
   - **Base Value**: 1
   - **Best Redemption**: 1.5
   - **Display Order**: 11

### Step 2: Update Credit Card Schema

1. Open [sanity/schemas/creditCard.ts](sanity/schemas/creditCard.ts)
2. Find the `pointsProgram` field
3. Add to the `list` array:
   ```typescript
   { title: 'Citi ThankYou Points', value: 'Citi' },
   ```
4. Save and run:
   ```bash
   cd sanity
   npx sanity deploy
   ```

### Step 3: Use It

Now when creating/editing credit cards, you can select "Citi ThankYou Points" from the dropdown!

---

## 🚀 Future Enhancement Ideas

- Auto-calculate point value in the table based on selected program
- Show a preview of the points program on the card page
- Add a "Compare Programs" page showing all point values side-by-side
- Add earning calculators based on spending categories

---

**Questions? The points program is now fully integrated! 🎉**
