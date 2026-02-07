import random
import time

# State persists here
energy_state = {
    "Academic_Block_A": 320, "Academic_Block_B": 290, "Library": 180,
    "Research_Center": 160, "Student_Center": 230, "Engineering_Labs": 380,
    "Hostel_1": 145, "Hostel_2": 138, "Hostel_3": 152, "Admin_Building": 90,
    "Sports_Complex": 112, "Cafeteria": 198, "Auditorium": 76,
    "Medical_Center": 67, "Parking_Solar": 150 
}

def update_energy_state():
    """Logic to jitter the state"""
    for building in energy_state:
        energy_state[building] += random.randint(-12, 18)
        energy_state[building] = max(40, energy_state[building])

    total_load = sum(energy_state.values())
    peak_zone = max(energy_state, key=energy_state.get)

    return {
        "timestamp": time.time(),
        "buildings": energy_state,
        "total_load": round(total_load, 2),
        "solar_gen": round(energy_state["Parking_Solar"], 2),
        "peak_zone": peak_zone,
        "peak_value": energy_state[peak_zone]
    }