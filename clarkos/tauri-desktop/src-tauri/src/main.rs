#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod commands;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            window.set_decorations(false).unwrap();
            window.set_resizable(true).unwrap();
            #[cfg(debug_assertions)]
            window.open_devtools();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_system_info,
            commands::get_battery_status,
            commands::get_network_status,
            commands::open_app,
            commands::close_window,
            commands::minimize_window,
            commands::maximize_window,
            commands::unmaximize_window,
            commands::is_maximized,
            commands::start_dragging,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
