fx_version 'cerulean'
author 'Project Los Santos'
games { 'gta5' }
lua54 'yes'

client_script 'client/main.lua'

shared_script {
    '@ox_lib/init.lua',
}

ui_page 'web/index.html'
files {
    'web/index.html',
    'web/index.js',
}

escrow_ignore {
    'web/index.html'
}
