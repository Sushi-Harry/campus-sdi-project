def calculate_composite_score(water_data, waste_data, carbon_data, green_cover_percent):
    """
    Calculates the Final Sustainability Score (0-100) using Weighted Pillars.
   
    """
    # 1. WATER PILLAR (25%) - Efficiency vs Benchmark + Reuse
    # Benchmark: 100L/student/day
    water_score = (0.6 * water_data['efficiency']) + (0.4 * water_data['reuse'])
    
    # 2. WASTE PILLAR (25%) - Segregation + Diversion
    # Waste Score = 0.5 × Segregation + 0.5 × Diversion
    waste_score = (0.5 * waste_data['segregation']) + (0.5 * waste_data['diversion'])
    
    # 3. CARBON PILLAR (30%) - Emissions efficiency
    # Target: 1 tCO2/student/year
    carbon_score = min(100, (1.0 / max(carbon_data['actual_tco2'], 0.1)) * 100)
    
    # 4. GREEN COVER PILLAR (20%) - Biodiversity Proxy
    # 40% Green Cover = 100 Score
    green_score = min(100, (green_cover_percent / 40.0) * 100)

    # FINAL WEIGHTED SUM
    final_score = (
        (0.25 * water_score) + 
        (0.25 * waste_score) + 
        (0.30 * carbon_score) + 
        (0.20 * green_score)
    )
    
    return {
        "final_score": round(final_score, 2),
        "pillars": {
            "water": round(water_score, 2),
            "waste": round(waste_score, 2),
            "carbon": round(carbon_score, 2),
            "green": round(green_score, 2)
        }
    }