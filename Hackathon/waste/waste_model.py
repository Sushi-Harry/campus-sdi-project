def simulate_diversion(extra_compost_capacity_kg: int):
    baseline_landfill = 540  # from UI baseline

    reduction = min(extra_compost_capacity_kg * 0.8, baseline_landfill)

    new_landfill = baseline_landfill - reduction
    new_diversion_rate = min(95, 81 + (reduction / 100))

    return {
        "baseline_landfill": baseline_landfill,
        "new_landfill": round(new_landfill, 1),
        "reduction": round(reduction, 1),
        "new_diversion_rate": round(new_diversion_rate, 1)
    }
