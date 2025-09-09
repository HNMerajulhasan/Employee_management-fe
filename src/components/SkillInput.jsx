export default function SkillInput({ skill, onChange, onRemove }) {
  return (
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        placeholder="Skill Name"
        value={skill.name}
        onChange={(e) => onChange({ ...skill, name: e.target.value })}
        className="border p-2 w-1/3"
      />
      <input
        type="text"
        placeholder="Skill Description"
        value={skill.description}
        onChange={(e) => onChange({ ...skill, description: e.target.value })}
        className="border p-2 w-1/2"
      />
      <button
        type="button"
        onClick={onRemove}
        className="bg-red-500 text-white px-2 rounded"
      >
        X
      </button>
    </div>
  );
}
