--- Steam Tierlister: backend entry point.
--- Runs natively in Millennium's LuaJIT VM. Lifecycle hooks + the Hooking-API patch for the nav tab.
--- See ARCHITECTURE.md §2 and DECISIONS D-010.

local logger     = require("logger")
local millennium = require("millennium")

--- Called when Millennium starts the plugin. Must call millennium.ready() within ~10 s,
--- otherwise Millennium treats the plugin as crashed.
local function on_load()
    logger:info("steam-tierlister backend loaded (Millennium " .. tostring(millennium.version()) .. ")")
    millennium.ready()
end

--- Called when the plugin is disabled or Steam shuts down (not guaranteed on a crash).
local function on_unload()
    logger:info("steam-tierlister backend unloaded")
end

--- Hooking-API patches: RE2 find/replace applied to Steam's JavaScript as it is served.
---
--- Tierlists tab: Steam's top bar (SuperNav) renders its tabs with one shared component (minified, e.g. `jt`)
--- that takes { title, name, rootRoute, menuItems }. It underlines a tab when the current route matches
--- `rootRoute`, and it navigates there on click. We append one more instance of that same component pointing
--- at "/tierlists" (the page is registered by the frontend via routerHook.addRoute). Using Steam's own
--- component gives native styling, theme compatibility, and the selected/underline state for free.
---
--- Verified against steamui/sp.js on 2026-11-12 (RESEARCH_FINDINGS.md §12). Minified names change between
--- Steam builds, so every name is captured with \w+ rather than hard-coded.
---
--- `find`  : one region from the tab component's definition to the end of the SuperNav children array.
--- `match` : \1 = tab component name, \2 = everything in between, \3 = jsx factory (e.g. e.jsx),
---           \4 = the last existing tab element. The final `]` closes the children array.
--- `replace`: re-emits the region unchanged and appends our tab before the closing `]`.
--- Long strings use [=[ ... ]=] because the regexes themselves contain "]]".
local function get_patches()
    return {
        {
            find = [=[const \w+=\w+=>\{const\{title:\w+,name:\w+,parentalFeature:[^}]*rootRoute:[\s\S]*?className:\w+\(\)\.SuperNav,children:\[[^\]]*\]]=],
            file = [=[(sp|chunk~[0-9a-f]+)\.js]=],
            transforms = {
                {
                    match = [=[^const (\w+)=([\s\S]*)\(0,(\w+\.jsx)\)\((\w+),\{\}\)\]$]=],
                    replace = [=[const \1=\2(0,\3)(\4,{}),(0,\3)(\1,{title:"Tierlists Supernav",name:(0,\3)("span",{children:"Tierlists"}),rootRoute:"/tierlists",menuItems:[]})]]=],
                },
            },
        },
    }
end

return {
    on_load = on_load,
    on_unload = on_unload,
    patches = get_patches(),
}
