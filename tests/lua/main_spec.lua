-- Smoke test for backend/main.lua, run with busted on LuaJIT in CI (D-020).
-- Millennium's built-in modules (logger, millennium) don't exist outside Steam, so we provide
-- minimal fakes through package.preload before loading the file.

describe("backend/main.lua", function()
    local ready_calls
    local plugin

    before_each(function()
        ready_calls = 0
        package.loaded["logger"] = nil
        package.loaded["millennium"] = nil
        package.preload["logger"] = function()
            return { info = function() end, warn = function() end, error = function() end }
        end
        package.preload["millennium"] = function()
            return {
                version = function() return "test" end,
                ready = function() ready_calls = ready_calls + 1 end,
            }
        end
        -- Loading the file also proves it parses (a bad string escape fails the whole backend; see §12).
        plugin = dofile("backend/main.lua")
    end)

    it("exports the lifecycle hooks", function()
        assert.is_function(plugin.on_load)
        assert.is_function(plugin.on_unload)
    end)

    it("calls millennium.ready() exactly once on load", function()
        plugin.on_load()
        assert.are.equal(1, ready_calls)
    end)

    it("declares the nav-tab patch with find/file/transforms", function()
        assert.is_table(plugin.patches)
        assert.are.equal(1, #plugin.patches)
        local patch = plugin.patches[1]
        assert.is_string(patch.find)
        assert.is_string(patch.file)
        assert.are.equal(1, #patch.transforms)
        assert.is_string(patch.transforms[1].match)
        assert.truthy(patch.transforms[1].replace:find('rootRoute:"/tierlists"', 1, true))
    end)
end)
