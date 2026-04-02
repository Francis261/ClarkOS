use serde::{Deserialize, Serialize};
use tauri::{Manager, Runtime};

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    pub os_name: String,
    pub hostname: String,
    pub cpu_model: String,
    pub total_memory: u64,
    pub memory_unit: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BatteryStatus {
    pub charging: bool,
    pub level: u8,
    pub time_remaining: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NetworkStatus {
    pub connected: bool,
    pub ssid: Option<String>,
    pub signal_strength: Option<u8>,
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
    SystemInfo {
        os_name: "ClarkOS 1.0".to_string(),
        hostname: "clarkos".to_string(),
        cpu_model: "Virtual CPU".to_string(),
        total_memory: 4096,
        memory_unit: "MB".to_string(),
    }
}

#[tauri::command]
pub fn get_battery_status() -> BatteryStatus {
    BatteryStatus {
        charging: true,
        level: 85,
        time_remaining: Some(120),
    }
}

#[tauri::command]
pub fn get_network_status() -> NetworkStatus {
    NetworkStatus {
        connected: true,
        ssid: Some("ClarkOS-WiFi".to_string()),
        signal_strength: Some(75),
    }
}

#[tauri::command]
pub async fn open_app<R: Runtime>(app: tauri::AppHandle<R>, app_id: String) -> Result<(), String> {
    log::info!("Opening app: {}", app_id);
    Ok(())
}

#[tauri::command]
pub async fn close_window<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    window.close().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn minimize_window<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    window.minimize().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn maximize_window<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    window.maximize().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn unmaximize_window<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    window.unmaximize().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn is_maximized<R: Runtime>(window: tauri::Window<R>) -> Result<bool, String> {
    window.is_maximized().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn start_dragging<R: Runtime>(window: tauri::Window<R>) -> Result<(), String> {
    window.start_drag_move().map_err(|e| e.to_string())
}
