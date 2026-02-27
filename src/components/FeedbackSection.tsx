import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  message: string;
  created_at: string;
}

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch existing feedbacks
    const fetchFeedbacks = async () => {
      const { data } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setFeedbacks(data);
    };
    fetchFeedbacks();

    // Subscribe to real-time inserts
    const channel = supabase
      .channel("feedbacks-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedbacks" },
        (payload) => {
          setFeedbacks((prev) => [payload.new as Feedback, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from("feedbacks").insert({
      name: name.trim(),
      role: role.trim() || null,
      rating,
      message: message.trim(),
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit feedback. Try again.", variant: "destructive" });
    } else {
      toast({ title: "Thank you! 🎉", description: "Your feedback has been submitted." });
      setName("");
      setRole("");
      setRating(5);
      setMessage("");
    }
  };

  return (
    <section id="feedback" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Share Your <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Your feedback helps others make informed decisions. Share your experience working with Deepak!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Feedback Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl glass glow-border space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageSquarePlus size={20} className="text-primary" />
              <h3 className="font-semibold text-lg">Leave a Review</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="Your Role (optional)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5"
                  >
                    <Star
                      size={24}
                      className={`transition-colors ${
                        s <= (hoverRating || rating)
                          ? "text-primary fill-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Share your experience... *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-card/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send size={18} />
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </motion.form>

          {/* Real-time Feedback List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin"
          >
            <AnimatePresence mode="popLayout">
              {feedbacks.length === 0 ? (
                <p className="text-muted-foreground text-center py-10">
                  Be the first to share your feedback!
                </p>
              ) : (
                feedbacks.map((fb) => (
                  <motion.div
                    key={fb.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    className="p-5 rounded-xl glass glow-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">{fb.name}</span>
                        {fb.role && (
                          <span className="text-sm text-muted-foreground ml-2">— {fb.role}</span>
                        )}
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={14}
                            className={j < fb.rating ? "text-primary fill-primary" : "text-muted-foreground/20"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{fb.message}"</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {new Date(fb.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
