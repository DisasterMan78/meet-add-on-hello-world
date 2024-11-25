'use client';

import { useEffect, useState } from 'react';
import {
    meet,
    MeetSidePanelClient,
} from '@googleworkspace/meet-addons/meet.addons';

export default function Page() {
    const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

    // Launches the main stage when the main button is clicked.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function startActivity(e: unknown) {
        if (!sidePanelClient) {
            throw new Error('Side Panel is not yet initialized!');
        }
        await sidePanelClient.startActivity({
            mainStageUrl: 'MAIN_STAGE_URL'
        });
    }

    /**
     * Prepares the Add-on Side Panel Client.
     */
    useEffect(() => {
        (async () => {
            const session = await meet.addon.createAddonSession({
                cloudProjectNumber: 'CLOUD_PROJECT_NUMBER',
            });
            setSidePanelClient(await session.createSidePanelClient());
        })();
    }, []);

    return (
        <>
            <div>
                This is the Add-on Side Panel. Only you can see this.
            </div>
            <button onClick={startActivity}>
                Launch Activity in Main Stage.
            </button>
        </>
    );
}
