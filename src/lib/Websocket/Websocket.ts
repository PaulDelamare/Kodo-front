export class WebSocketManager<T> {
    private socket: WebSocket | null = null;
    private isConnected: boolean = false; // Indique si la connexion est active
    private reconnecting: boolean = false; // Indique si une reconnexion est déjà programmée
    private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null; // Pour stocker le timeout de reconnexion
    private url: string = 'ws://localhost:7000/socket-historic';
    private websocketKey: string;
    private bearer: string;
    private reconnectInterval: number;
    private pingIntervalDuration: number;
    private onMessageCallback: (data: T) => void;
    private action: string;
    private id: string | null;

    constructor(
        websocketKey: string,
        bearer: string,
        onMessageCallback: (data: T) => void,
        action: string,
        id: string | null = null,
        reconnectInterval = 5000,
        pingInterval = 60000
    ) {
        this.websocketKey = websocketKey;
        this.bearer = bearer;
        this.onMessageCallback = onMessageCallback;
        this.reconnectInterval = reconnectInterval;
        this.pingIntervalDuration = pingInterval;
        this.action = action;
        this.id = id;
    }

    public connect() {
        if (this.isConnected || this.reconnecting) {
            console.info('🔄 Déjà connecté ou reconnexion en cours, pas de nouvelle connexion.');
            return;
        }

        console.info('🔌 Connecting WebSocket...');
        this.socket = new WebSocket(
            `${this.url}?api_key=${encodeURIComponent(this.websocketKey)}`,
            [this.bearer]
        );

        this.socket.onopen = () => {
            console.info('✅ WebSocket connected!');
            this.isConnected = true;
            this.reconnecting = false;
            if (this.reconnectTimeoutId) {
                clearTimeout(this.reconnectTimeoutId);
                this.reconnectTimeoutId = null;
            }
            this.send({ action: this.action, id: this.id });
        };

        this.socket.onmessage = (event) => {
            const dataMsg = event.data;
            try {
                const initialParsed = JSON.parse(dataMsg);
                if (initialParsed.message) {
                    const parsedMessage = JSON.parse(initialParsed.message);
                    this.onMessageCallback(parsedMessage);
                } else {
                    if (
                        'event' in initialParsed &&
                        (initialParsed.event === 'pong' || initialParsed.event === 'ping')
                    ) {
                        console.info('Ping reçu du serveur');
                        this.send({ action: 'pong' });
                    }
                }
            } catch (error) {
                console.error('❌ Failed to parse WebSocket message:', error, dataMsg);
            }
        };

        this.socket.onerror = (error) => {
            console.error('❌ WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.info('🔌 WebSocket disconnected.');
            this.isConnected = false;
            this.scheduleReconnect();
        };
    }

    private scheduleReconnect() {
        if (this.reconnecting) {
            console.info('🔄 Reconnexion déjà programmée.');
            return;
        }
        this.reconnecting = true;
        console.info(`⏳ Reconnexion programmée dans ${this.reconnectInterval} ms...`);
        this.reconnectTimeoutId = setTimeout(() => {
            console.info('⏳ Tentative de reconnexion...');
            this.connect();
        }, this.reconnectInterval);
    }

    public async ensureConnected(): Promise<void> {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.info('WebSocket is not connected. Reconnecting...');
            this.connect();

            await new Promise<void>((resolve, reject) => {
                const checkInterval = setInterval(() => {
                    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
                setTimeout(() => {
                    clearInterval(checkInterval);
                    reject('WebSocket connection timed out');
                }, 5000);
            }).catch((err) => {
                console.error('Reconnection error:', err);
            });
        }
    }

    public send(data: { action: string; id?: string | null }) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('Cannot send message. WebSocket is not connected.');
        }
    }

    public close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            this.isConnected = false;
            this.reconnecting = false;
            if (this.reconnectTimeoutId) {
                clearTimeout(this.reconnectTimeoutId);
                this.reconnectTimeoutId = null;
            }
            console.info('🔴 WebSocket closed.');
        }
    }
}
