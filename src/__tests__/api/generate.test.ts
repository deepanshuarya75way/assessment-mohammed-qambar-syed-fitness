const mockGetSession = jest.fn();
const mockInsertOne = jest.fn();
const mockCallGemini = jest.fn();

jest.mock('@/lib/auth', () => ({
  getSession: (...args: any[]) => mockGetSession(...args),
}));

jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: Promise.resolve({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: (...args: any[]) => mockInsertOne(...args),
      }),
    }),
  }),
}));

jest.mock('@/lib/gemini', () => {
  const actual = jest.requireActual('@/lib/gemini');
  return {
    ...actual,
    callGeminiCascade: (...args: any[]) => mockCallGemini(...args),
  };
});

import { POST } from '@/app/api/generate/route';

const validBody = {
  age: '25',
  height: '180cm',
  weight: '75kg',
  bodyType: 'Athletic',
  goal: 'Build Muscle',
  trainingLocation: 'Commercial Gym',
  fasting: false,
  image: null,
};

const mockPlan = {
  planTitle: 'Strength Plan',
  summary: 'A great plan',
  detectedBodyType: null,
  biometricProjections: { muscleMassDelta: '+2lbs', bodyFatDelta: '-1%', timeline: '12 Weeks' },
  weeklyStructure: [
    {
      day: 'Monday',
      focus: 'Chest',
      exercises: [
        { name: 'Bench Press', sets: 3, reps: '8-10', rpe: 7, notes: 'Control descent', videoQuery: 'bench press form' },
        { name: 'Incline Press', sets: 3, reps: '8-10', rpe: 7, notes: 'Upper chest', videoQuery: 'incline press form' },
        { name: 'Dumbbell Flyes', sets: 3, reps: '10-12', rpe: 8, notes: 'Stretch chest', videoQuery: 'flyes form' },
        { name: 'Dips', sets: 3, reps: '10-12', rpe: 8, notes: 'Chest emphasis', videoQuery: 'dips form' },
        { name: 'Pushups', sets: 3, reps: '15-20', rpe: 7, notes: 'Burnout finisher', videoQuery: 'pushups form' }
      ]
    }
  ],
  nutrition: { calories: '2500', protein: '180g', carbs: '300g', fats: '80g', advice: 'Eat well' },
};

function makeRequest(body: object) {
  return new Request('http://localhost/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/generate', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 401 when not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(401);
    expect(mockCallGemini).not.toHaveBeenCalled();
  });

  it('returns plan data on successful generation', async () => {
    mockGetSession.mockResolvedValue({ user: { id: '123' } });
    mockCallGemini.mockResolvedValue({ text: JSON.stringify(mockPlan), model: 'gemini-3.8-flash' });
    mockInsertOne.mockResolvedValue({ insertedId: 'routine-id' });

    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.planTitle).toBe('Strength Plan');
  });

  it('saves plan to DB with userId', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockCallGemini.mockResolvedValue({ text: JSON.stringify(mockPlan), model: 'gemini-3.8-flash' });
    mockInsertOne.mockResolvedValue({ insertedId: 'id' });

    await POST(makeRequest(validBody));

    expect(mockInsertOne).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'user-123', planTitle: 'Strength Plan' })
    );
  });

  it('handles AI failure gracefully with personalized fallback', async () => {
    mockGetSession.mockResolvedValue({ user: { id: '123' } });
    mockCallGemini.mockRejectedValue(new Error('AI Service Unavailable'));

    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.planTitle).toContain('Build Muscle');
    expect(data.weeklyStructure.length).toBeGreaterThan(0);
  });
});
