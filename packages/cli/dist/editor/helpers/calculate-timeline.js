"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTimeline = void 0;
const get_sequence_visible_range_1 = require("./get-sequence-visible-range");
const get_timeline_nestedness_1 = require("./get-timeline-nestedness");
const get_timeline_sequence_hash_1 = require("./get-timeline-sequence-hash");
const get_timeline_sequence_sort_key_1 = require("./get-timeline-sequence-sort-key");
const isTrackWithinParentBounds = (track) => {
    return [
        track.cascadedStart + track.cascadedDuration >= track.sequence.from,
        track.cascadedStart <= track.sequence.from + track.sequence.duration,
    ].every(Boolean);
};
const canCollapse = (track, allTracks) => {
    return Boolean(allTracks.find((t) => t.parent === track.id));
};
const calculateTimeline = ({ sequences, sequenceDuration, }) => {
    const tracks = [];
    if (sequences.length === 0) {
        return [
            {
                sequence: {
                    displayName: '',
                    duration: sequenceDuration,
                    from: 0,
                    id: 'seq',
                    parent: null,
                    type: 'sequence',
                    rootId: '-',
                    showInTimeline: true,
                    nonce: 0,
                    showLoopTimesInTimeline: undefined,
                },
                depth: 0,
                hash: '-',
                canCollapse: false,
            },
        ];
    }
    const sameHashes = {};
    const hashesUsedInRoot = {};
    const cache = {};
    for (let i = 0; i < sequences.length; i++) {
        const sequence = sequences[i];
        if (!hashesUsedInRoot[sequence.rootId]) {
            hashesUsedInRoot[sequence.rootId] = [];
        }
        const actualHash = (0, get_timeline_sequence_hash_1.getTimelineSequenceHash)(sequence, sequences, hashesUsedInRoot, cache);
        if (!sameHashes[actualHash]) {
            sameHashes[actualHash] = [];
        }
        sameHashes[actualHash].push(sequence.id);
        const cascadedStart = (0, get_sequence_visible_range_1.getCascadedStart)(sequence, sequences);
        const visibleStart = (0, get_sequence_visible_range_1.getTimelineVisibleStart)(sequence, sequences);
        const visibleDuration = (0, get_sequence_visible_range_1.getTimelineVisibleDuration)(sequence, sequences);
        tracks.push({
            sequence: {
                ...sequence,
                from: visibleStart,
                duration: visibleDuration,
            },
            depth: (0, get_timeline_nestedness_1.getTimelineNestedLevel)(sequence, sequences, 0),
            hash: actualHash,
            cascadedStart,
            cascadedDuration: sequence.duration,
            canCollapse: canCollapse(sequence, sequences),
        });
    }
    const uniqueTracks = [];
    for (const track of tracks) {
        if (!uniqueTracks.find((t) => t.hash === track.hash) &&
            track.sequence.showInTimeline &&
            isTrackWithinParentBounds(track)) {
            const { cascadedDuration, cascadedStart, ...cleanTrack } = track;
            uniqueTracks.push(cleanTrack);
        }
    }
    return uniqueTracks.sort((a, b) => {
        const sortKeyA = (0, get_timeline_sequence_sort_key_1.getTimelineSequenceSequenceSortKey)(a, tracks, sameHashes);
        const sortKeyB = (0, get_timeline_sequence_sort_key_1.getTimelineSequenceSequenceSortKey)(b, tracks, sameHashes);
        return sortKeyA.localeCompare(sortKeyB);
    });
};
exports.calculateTimeline = calculateTimeline;
