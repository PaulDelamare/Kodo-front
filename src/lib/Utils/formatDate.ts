/**
 * Retourne une chaîne lisible indiquant le temps écoulé depuis une date.
 * Ex: "4 heures", "3 jours", "2 semaines", ou si > 4 semaines : "27/05/2025"
 */
export function timeSince(date: Date | string): string {
    const now = new Date();
    const d = typeof date === 'string' ? new Date(date) : date;
    const diffMs = now.getTime() - d.getTime();

    if (isNaN(d.getTime())) return '';

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks >= 4) {
        // Retourne la date au format jj/mm/YYYY
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    } else if (weeks >= 1) {
        return `${weeks} semaine${weeks > 1 ? 's' : ''}`;
    } else if (days >= 1) {
        return `${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours >= 1) {
        return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (minutes >= 1) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
}


export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('fr-FR', options);
}