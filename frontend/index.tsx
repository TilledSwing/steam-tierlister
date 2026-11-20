/**
 * Steam Tierlister: frontend entry point (runs inside Steam's UI).
 *
 * - Registers the `/tierlists` page with Millennium's routerHook. The nav tab that links to it is added by
 *   the backend patch in backend/main.lua (D-010).
 * - Returns the plugin's settings panel for Millennium's sidebar (UX-3: settings only via `content`).
 *
 * M0: the page is an intentionally empty shell. Real UI starts in M3.
 */
import { definePlugin, Field, routerHook } from 'millennium';

export const TIERLISTS_ROUTE = '/tierlists';

/** Empty page shell, shown when the Tierlists tab is selected. */
function TierlistsPage() {
	return <Field label="Tierlists" description="Coming soon." bottomSeparator="none" />;
}

/** Settings panel shown in Millennium's plugin sidebar. */
function SettingsPanel() {
	return <Field label="Steam Tierlister" description="No settings yet." bottomSeparator="none" />;
}

export default definePlugin(() => {
	routerHook.addRoute(TIERLISTS_ROUTE, TierlistsPage);
	return {
		title: 'Steam Tierlister',
		icon: <span>TL</span>,
		content: <SettingsPanel />,
	};
});
