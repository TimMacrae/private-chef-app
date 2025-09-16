package com.privatechef.collaboration.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CollaborationsStatusTest {
    @Test
    void collaborationsStatus_testEnumValues() {
        CollaborationsStatus[] values = CollaborationsStatus.values();
        assertArrayEquals(
                new CollaborationsStatus[]{CollaborationsStatus.PENDING, CollaborationsStatus.ACCEPTED, CollaborationsStatus.DECLINED},
                values
        );
    }

    @Test
    void collaborationsStatus_testValueOf() {
        assertEquals(CollaborationsStatus.PENDING, CollaborationsStatus.valueOf("PENDING"));
        assertEquals(CollaborationsStatus.ACCEPTED, CollaborationsStatus.valueOf("ACCEPTED"));
        assertEquals(CollaborationsStatus.DECLINED, CollaborationsStatus.valueOf("DECLINED"));
    }
    

    @Test
    void collaborationsStatus_testInvalidValueOfThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> CollaborationsStatus.valueOf("INVALID"));
    }
}