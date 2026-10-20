import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initializeNASDIStorage,
  loginUser,
  changePassword,
  getLeadershipPositions,
  getDepartments,
  saveDraftSubmission,
  submitAssessment,
  reviewAssessmentSubmission,
  getAuditLogs,
  getAllUserAccounts,
} from './nasdiStorage';

// Mock localStorage for node test environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('NASDI Storage & Authentication System', () => {
  beforeEach(async () => {
    localStorage.clear();
    await initializeNASDIStorage();
  });

  it('should seed default leadership positions and departments according to updated structure', () => {
    const positions = getLeadershipPositions();
    const departments = getDepartments();

    expect(positions.length).toBe(9);
    expect(positions[0].officeholder).toBe('Sherifdeen Titilope Alimi');
    expect(positions[1].officeholder).toBe('Bello Hajara');
    expect(positions[3].officeholder).toBe('ONIYE MARY');
    expect(positions[7].officeholder).toBe('KENNY OSEWA');
    expect(positions[8].officeholder).toBe('ONIYE MARY');

    expect(departments.length).toBe(7);
  });

  it('should authenticate team members logging in with surname or name@nasdi.org using initial password Sherifdeen', async () => {
    // Test 1: Full email bello@nasdi.org
    const res1 = await loginUser('bello@nasdi.org', 'Sherifdeen');
    expect(res1.success).toBe(true);
    expect(res1.user?.fullName).toBe('Bello Hajara');

    // Test 2: Surname alone 'bello'
    const res2 = await loginUser('bello', 'Sherifdeen');
    expect(res2.success).toBe(true);
    expect(res2.user?.fullName).toBe('Bello Hajara');

    // Test 3: ONIYE MARY 'oniyemary'
    const res3 = await loginUser('oniyemary', 'Sherifdeen');
    expect(res3.success).toBe(true);
    expect(res3.user?.fullName).toBe('ONIYE MARY');
  });

  it('should support multi-office user accounts like ONIYE MARY holding Chief of Staff and Spokesperson', async () => {
    const users = getAllUserAccounts();
    const oniyeUser = users.find((u) => u.email === 'oniyemary@nasdi.org');

    expect(oniyeUser).toBeDefined();
    expect(oniyeUser?.fullName).toBe('ONIYE MARY');
    expect(oniyeUser?.positionIds).toContain('pos-4');
    expect(oniyeUser?.positionIds).toContain('pos-9');
  });

  it('should enforce password change for initial password Sherifdeen', async () => {
    const loginRes = await loginUser('bello@nasdi.org', 'Sherifdeen');
    expect(loginRes.user).toBeDefined();

    const changeRes = await changePassword(loginRes.user!.id, 'NewBelloPass2026!');
    expect(changeRes.success).toBe(true);

    const newLoginRes = await loginUser('bello@nasdi.org', 'NewBelloPass2026!');
    expect(newLoginRes.success).toBe(true);
    expect(newLoginRes.mustChangePassword).toBe(false);
  });

  it('should handle draft saving and assessment submission', () => {
    const draft = saveDraftSubmission({
      userId: 'usr-oniyemary-1',
      sectionA: {
        fullName: 'ONIYE MARY',
        email: 'oniyemary@nasdi.org',
        positionId: 'pos-4',
        educationalBackground: 'Master of Science in Educational Administration',
        professionalExperience: '12 years in institutional management & advocacy',
        areasOfInterest: 'Policy & Advocacy',
        previousLeadership: 'Chief of Staff & Female SDG 4 Spokesperson',
        certifications: 'Senior Educational Leader',
      },
    });

    expect(draft.id).toBeDefined();
    expect(draft.status).toBe('DRAFT');

    const submitted = submitAssessment({
      ...draft,
      userId: 'usr-oniyemary-1',
    });

    expect(submitted.status).toBe('SUBMITTED');
    expect(submitted.submittedAt).toBeDefined();
  });

  it('should allow reviewer to record comments and review decision', async () => {
    const draft = saveDraftSubmission({
      userId: 'usr-adebisi-1',
      sectionA: {
        fullName: 'Samuel Adebisi',
        email: 'adebisi@nasdi.org',
        positionId: 'pos-3',
        educationalBackground: 'B.Ed Educational Technology',
        professionalExperience: '5 years digital literacy advocacy',
        areasOfInterest: 'EdTech Integration',
        previousLeadership: 'Second Deputy Lead',
        certifications: 'Digital Educator',
      },
    });

    const sub = submitAssessment({ ...draft, userId: 'usr-adebisi-1' });

    const users = getAllUserAccounts();
    const admin = users.find((u) => u.role === 'SUPER_ADMIN')!;

    const reviewRes = reviewAssessmentSubmission(admin, sub.id, {
      comments: 'Excellent documentation and competency evidence provided.',
      recommendations: 'Recommend advanced policy training.',
      decision: 'APPROVED',
    });

    expect(reviewRes.success).toBe(true);
    expect(reviewRes.submission?.status).toBe('APPROVED');
    expect(reviewRes.submission?.reviewerComments).toBe('Excellent documentation and competency evidence provided.');
  });

  it('should log audit records for security actions', () => {
    const logs = getAuditLogs();
    expect(logs.length).toBeGreaterThan(0);
    expect(logs[0].action).toBeDefined();
  });
});
